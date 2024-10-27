import os
import math
import uuid
from services.WatsonService.Watson import Watson
from services.Database.Database import Database


def load_chunks():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(base_dir, "services/PdfService/output")

    chunks = []

    for filename in os.listdir(output_dir):
        if filename.endswith(".txt"):
            txt_path = os.path.join(output_dir, filename)
            document_id = os.path.splitext(filename)[0]

            with open(txt_path, "r", encoding="utf-8") as txt_file:
                content = txt_file.read()

            chunk_texts = content.strip().split("\n\n")
            for idx, chunk in enumerate(chunk_texts):
                if chunk.strip():
                    chunk_data = {
                        "text": chunk.strip(),
                        "metadata": {
                            "document_id": document_id,
                            "chunk_id": f"{document_id}_{idx}",
                            "source": txt_path,
                        },
                    }
                    chunks.append(chunk_data)
    return chunks


def generate_embeddings_for_chunks(chunks, batch_size=100):
    watson_instance = Watson()
    embeddings_data = []

    total_chunks = len(chunks)
    num_batches = math.ceil(total_chunks / batch_size)

    for batch_num in range(num_batches):
        start_idx = batch_num * batch_size
        end_idx = min((batch_num + 1) * batch_size, total_chunks)
        batch_chunks = chunks[start_idx:end_idx]

        texts = [chunk["text"] for chunk in batch_chunks]

        embeddings = watson_instance.generate_embedding(texts)
        if embeddings is None:
            print(f"Failed to generate embeddings for batch {batch_num + 1}.")
            continue

        for i, embedding in enumerate(embeddings):
            embedding_data = {
                "embedding": embedding,
                "metadata": batch_chunks[i]["metadata"],
            }
            embeddings_data.append(embedding_data)

        print(f"Processed batch {batch_num + 1}/{num_batches}.")

    return embeddings_data


def prepare_data_for_pinecone(embeddings_data):
    data = []
    for item in embeddings_data:
        vector_id = str(uuid.uuid4())

        vector_data = {
            "id": vector_id,
            "values": item["embedding"],
            "metadata": item["metadata"],
        }
        data.append(vector_data)
    return data


def insert_embeddings_into_pinecone(embeddings_data, batch_size=100):
    """
    Inserts embeddings into Pinecone in smaller batches to avoid exceeding request size limits.

    :param embeddings_data: List of embeddings with metadata.
    :param batch_size: Number of vectors per batch.
    """
    database_instance = Database()

    data = prepare_data_for_pinecone(embeddings_data)

    total_vectors = len(data)
    num_batches = math.ceil(total_vectors / batch_size)

    print(f"Starting insertion of {total_vectors} vectors in {num_batches} batches.")

    for batch_num in range(num_batches):
        start_idx = batch_num * batch_size
        end_idx = min((batch_num + 1) * batch_size, total_vectors)
        batch_data = data[start_idx:end_idx]

        try:
            success = database_instance.insert(batch_data)
            if success:
                print(f"Inserted batch {batch_num + 1}/{num_batches} successfully.")
            else:
                print(
                    f"Failed to insert batch {batch_num + 1}/{num_batches}. Retrying..."
                )
        except Exception as e:
            print(
                f"Exception occurred while inserting batch {batch_num + 1}/{num_batches}: {e}"
            )

    print("All batches processed.")


def main():
    print("Loading chunks from output files...")
    chunks = load_chunks()
    print(f"Loaded {len(chunks)} chunks.")

    print("Generating embeddings for chunks...")
    embeddings_data = generate_embeddings_for_chunks(chunks, batch_size=100)
    print(f"Generated embeddings for {len(embeddings_data)} chunks.")

    print("Inserting embeddings into Pinecone...")
    insert_embeddings_into_pinecone(embeddings_data, batch_size=100)


if __name__ == "__main__":
    main()
