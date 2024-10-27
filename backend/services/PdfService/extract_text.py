import os
from pypdf import PdfReader
import re
from transformers import RobertaTokenizer

def split_text_to_fit(text, tokenizer, max_tokens):
    """
    Recursively split text into chunks that fit within the max_tokens limit.
    """
    tokens = tokenizer.encode(text, add_special_tokens=False)
    tokenizer.model_max_length = 3000
    if len(tokens) <= max_tokens:
        return [text.strip()]
    else:
        # Attempt to split by punctuation marks
        for sep in ['; ', ', ', ': ', ' ']:
            parts = text.split(sep)
            if len(parts) == 1:
                continue  # Cannot split further by this separator
            chunks = []
            current_chunk = ''
            current_tokens = 0
            for part in parts:
                part = part.strip()
                if not part:
                    continue
                part_tokens = tokenizer.encode(part, add_special_tokens=False)
                part_token_len = len(part_tokens)
                if part_token_len > max_tokens:
                    # Recursively split this part further
                    sub_chunks = split_text_to_fit(part, tokenizer, max_tokens)
                    chunks.extend(sub_chunks)
                elif current_tokens + part_token_len + 1 > max_tokens:
                    # Start a new chunk
                    chunks.append(current_chunk.strip())
                    current_chunk = part + sep
                    current_tokens = part_token_len + 1  # +1 for the separator
                else:
                    current_chunk += part + sep
                    current_tokens += part_token_len + 1  # +1 for the separator
            if current_chunk.strip():
                chunks.append(current_chunk.strip())
            return chunks
        # If cannot split by punctuation, split by words
        words = text.split(' ')
        chunks = []
        current_chunk = ''
        current_tokens = 0
        for word in words:
            word = word.strip()
            if not word:
                continue
            word_tokens = tokenizer.encode(word, add_special_tokens=False)
            word_token_len = len(word_tokens)
            if word_token_len > max_tokens:
                # Word itself is too long, truncate it
                word_tokens = word_tokens[:max_tokens]
                word = tokenizer.decode(word_tokens)
                chunks.append(word.strip())
            elif current_tokens + word_token_len + 1 > max_tokens:
                # Start a new chunk
                chunks.append(current_chunk.strip())
                current_chunk = word + ' '
                current_tokens = word_token_len + 1  # +1 for the space
            else:
                current_chunk += word + ' '
                current_tokens += word_token_len + 1  # +1 for the space
        if current_chunk.strip():
            chunks.append(current_chunk.strip())
        return chunks

def extract_text():
    print("Extracting text from PDFs and chunking into token-limited paragraphs...")

    # Get the directory where this script is located
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Define input and output directories relative to the script location
    input_dir = os.path.join(base_dir, "input")
    output_dir = os.path.join(base_dir, "output")

    # Create the output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    print(f"Output directory: {output_dir}")

    # Initialize a list to store all chunks from all PDFs
    all_chunks = []

    # Define the maximum number of tokens per chunk
    max_tokens = 512

    # Initialize the RoBERTa tokenizer
    tokenizer = RobertaTokenizer.from_pretrained('roberta-base')

    # Iterate over all PDF files in the input directory
    for filename in os.listdir(input_dir):
        if filename.endswith(".pdf"):
            # Construct full paths for the input PDF and output text file
            pdf_path = os.path.join(input_dir, filename)
            txt_filename = os.path.splitext(filename)[0] + ".txt"
            txt_path = os.path.join(output_dir, txt_filename)

            # Read the PDF file
            reader = PdfReader(pdf_path)
            text = ''
            for page in reader.pages:
                # Extract text from each page
                page_text = page.extract_text()
                if page_text:
                    text += page_text + '\n'

            # Clean up the text
            text = re.sub(r'\r\n|\r', '\n', text)  # Normalize line breaks
            text = re.sub(r'\n{2,}', '\n\n', text)  # Ensure double newlines separate paragraphs
            text = re.sub(r'\s+\n', '\n', text)  # Remove spaces before newlines

            # Split text into paragraphs
            paragraphs = text.split('\n\n')

            chunks = []
            current_chunk = ""
            current_chunk_tokens = 0

            # Process each paragraph
            for paragraph in paragraphs:
                # Strip leading and trailing whitespace
                paragraph = paragraph.strip()
                if not paragraph:
                    continue  # Skip empty paragraphs

                # Tokenize the paragraph
                paragraph_tokens = tokenizer.encode(paragraph, add_special_tokens=False)
                num_tokens = len(paragraph_tokens)

                if num_tokens > max_tokens:
                    # Split the paragraph into sentences
                    sentences = re.split(r'(?<=[.!?]) +', paragraph)
                    for sentence in sentences:
                        sentence = sentence.strip()
                        if not sentence:
                            continue

                        sentence_tokens = tokenizer.encode(sentence, add_special_tokens=False)
                        sentence_num_tokens = len(sentence_tokens)

                        if sentence_num_tokens > max_tokens:
                            # Split the sentence further using the split_text_to_fit function
                            split_sentences = split_text_to_fit(sentence, tokenizer, max_tokens)
                            for split_sentence in split_sentences:
                                split_sentence_tokens = tokenizer.encode(split_sentence, add_special_tokens=False)
                                split_sentence_num_tokens = len(split_sentence_tokens)
                                if current_chunk_tokens + split_sentence_num_tokens > max_tokens:
                                    # Save the current chunk and start a new one
                                    chunks.append(current_chunk.strip())
                                    current_chunk = split_sentence
                                    current_chunk_tokens = split_sentence_num_tokens
                                else:
                                    # Add the split sentence to the current chunk
                                    current_chunk += ' ' + split_sentence
                                    current_chunk_tokens += split_sentence_num_tokens
                        else:
                            if current_chunk_tokens + sentence_num_tokens > max_tokens:
                                # Save the current chunk and start a new one
                                chunks.append(current_chunk.strip())
                                current_chunk = sentence
                                current_chunk_tokens = sentence_num_tokens
                            else:
                                # Add the sentence to the current chunk
                                current_chunk += ' ' + sentence
                                current_chunk_tokens += sentence_num_tokens
                else:
                    if current_chunk_tokens + num_tokens > max_tokens:
                        # Save the current chunk and start a new one
                        chunks.append(current_chunk.strip())
                        current_chunk = paragraph
                        current_chunk_tokens = num_tokens
                    else:
                        # Add the paragraph to the current chunk
                        if current_chunk == "":
                            current_chunk = paragraph
                        else:
                            current_chunk += '\n\n' + paragraph
                        current_chunk_tokens += num_tokens

            # Add the last chunk if it's not empty
            if current_chunk.strip():
                chunks.append(current_chunk.strip())

            # Write the chunks to a text file
            with open(txt_path, "w", encoding='utf-8') as txt_file:
                for chunk in chunks:
                    txt_file.write(chunk + '\n\n')

            # Collect all chunks from all PDFs
            all_chunks.extend(chunks)

    # Now, all_chunks contains all the chunks extracted from the PDFs
    # You can process them further as needed, e.g., create embeddings, etc.

if __name__ == "__main__":
    extract_text()
