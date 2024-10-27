import os
import re
from pypdf import PdfReader
from transformers import RobertaTokenizer
import nltk
from nltk.tokenize import sent_tokenize

nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("wordnet")
nltk.download("omw-1.4")


def sliding_window_chunk(tokens, max_tokens=512, overlap=50):
    chunks = []
    for i in range(0, len(tokens), max_tokens - overlap):
        chunk = tokens[i : i + max_tokens]
        chunks.append(chunk)
    return chunks


def extract_text():
    print("Extracting text from PDFs and chunking into token-limited paragraphs...")

    base_dir = os.path.dirname(os.path.abspath(__file__))
    input_dir = os.path.join(base_dir, "input")
    output_dir = os.path.join(base_dir, "output")
    os.makedirs(output_dir, exist_ok=True)
    print(f"Output directory: {output_dir}")

    all_chunks = []
    max_tokens = 512
    overlap = 50
    tokenizer = RobertaTokenizer.from_pretrained("roberta-base")

    for filename in os.listdir(input_dir):
        if filename.endswith(".pdf"):
            pdf_path = os.path.join(input_dir, filename)
            txt_filename = os.path.splitext(filename)[0] + ".txt"
            txt_path = os.path.join(output_dir, txt_filename)

            print(f"Processing file: {filename}")

            reader = PdfReader(pdf_path)
            text = ""
            for page_num, page in enumerate(reader.pages):
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
                else:
                    print(f"Warning: Page {page_num + 1} in {filename} is empty.")

            text = re.sub(r"\r\n|\r", "\n", text)
            text = re.sub(r"\n{2,}", "\n\n", text)
            text = re.sub(r"\s+\n", "\n", text)

            paragraphs = text.split("\n\n")

            for paragraph in paragraphs:
                paragraph = paragraph.strip()
                if not paragraph:
                    continue

                paragraph_tokens = tokenizer.encode(paragraph, add_special_tokens=False)

                if len(paragraph_tokens) > max_tokens:
                    sentences = sent_tokenize(paragraph)
                    current_chunk = []
                    current_tokens = 0

                    for sentence in sentences:
                        sentence_tokens = tokenizer.encode(
                            sentence, add_special_tokens=False
                        )

                        if current_tokens + len(sentence_tokens) <= max_tokens:
                            current_chunk.extend(sentence_tokens)
                            current_tokens += len(sentence_tokens)
                        else:
                            all_chunks.extend(
                                sliding_window_chunk(current_chunk, max_tokens, overlap)
                            )
                            current_chunk = sentence_tokens
                            current_tokens = len(sentence_tokens)

                    if current_chunk:
                        all_chunks.extend(
                            sliding_window_chunk(current_chunk, max_tokens, overlap)
                        )
                else:
                    all_chunks.append(paragraph_tokens)

            with open(txt_path, "w", encoding="utf-8") as txt_file:
                for chunk in all_chunks:
                    chunk_text = tokenizer.decode(chunk)
                    txt_file.write(chunk_text + "\n\n")

    print(f"Processed all PDFs. Extracted {len(all_chunks)} chunks.")


if __name__ == "__main__":
    extract_text()
