import os


def get_all_chunks(output_dir):
    chunks_with_metadata = []

    for filename in os.listdir(output_dir):
        if filename.endswith(".txt"):
            txt_path = os.path.join(output_dir, filename)
            doc_id = os.path.splitext(filename)[0]

            with open(txt_path, "r", encoding="utf-8") as file:
                content = file.read()
                chunks = content.split("\n\n")
                for chunk in chunks:
                    chunk = chunk.strip()
                    if chunk:
                        metadata = {
                            "doc_id": doc_id,
                            "source": txt_path,
                        }
                        chunks_with_metadata.append((chunk, metadata))

    return chunks_with_metadata
