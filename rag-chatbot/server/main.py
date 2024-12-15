import os
from PyPDF2 import PdfReader
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import nltk

# Download punkt tokenizer if not already installed
# nltk.download('punkt')

os.environ["TRANSFORMERS_CACHE"] = "D:/huggingface_cache"  # Change to a directory with enough space
# Set the path to the model and tokenizer
model_path = "D:/huggingface_cache/gpt2-large"
tokenizer_path = "D:/huggingface_cache/gpt2-large"


def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    reader = PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def chunk_text(text, chunk_size=500, overlap=50):
    """Splits text into chunks of a specified size with optional overlap."""
    sentences = nltk.sent_tokenize(text)
    chunks = []
    chunk = ""
    for sentence in sentences:
        if len(chunk) + len(sentence) > chunk_size:
            chunks.append(chunk)
            chunk = sentence
        else:
            chunk += " " + sentence
    if chunk:
        chunks.append(chunk)
    return chunks

def load_gpt2_model():
    """Load Hugging Face GPT-2 model and tokenizer."""
    print("Loading GPT-2 model...")
    model = GPT2LMHeadModel.from_pretrained(model_path)
    tokenizer = GPT2Tokenizer.from_pretrained(tokenizer_path)
    return model, tokenizer

def generate_gpt2_response(query, model, tokenizer):
    """Generate a response using GPT-2 model."""
    inputs = tokenizer.encode(query, return_tensors="pt")
    outputs = model.generate(inputs, max_length=100, num_return_sequences=1)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

def main():
    print("Loading and processing document...")
    pdf_path = "THE-MICRO-GARDENER-SMALL-GARDENS-eBOOK.pdf"  # Replace with your PDF file path
    document_text = extract_text_from_pdf(pdf_path)
    chunks = chunk_text(document_text)

    print("Setting up embeddings and vector store...")
    hf_model = "all-MiniLM-L6-v2"  # Replace with your desired SentenceTransformers model

    # Create embeddings using HuggingFaceEmbeddings
    print("Creating embeddings...")
    embeddings = HuggingFaceEmbeddings(model_name=hf_model)

    # Create a FAISS vector store
    vector_store = FAISS.from_texts(chunks, embeddings)

    print("Setting up retrieval QA system...")
    retriever = vector_store.as_retriever()

    # Load GPT-2 model and tokenizer from Hugging Face
    model, tokenizer = load_gpt2_model()

    # Define a custom LLM using GPT-2
    class HuggingFaceGPT2LLM:
        def __init__(self, model, tokenizer):
            self.model = model
            self.tokenizer = tokenizer

        def __call__(self, query):
            return generate_gpt2_response(query, self.model, self.tokenizer)

    # Initialize the custom LLM
    llm = HuggingFaceGPT2LLM(model, tokenizer)

    # Set up QA chain
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

    print("System is ready! Ask your questions:")
    while True:
        query = input("\nEnter your question (or type 'exit' to quit): ")
        if query.lower() == "exit":
            print("Exiting system. Goodbye!")
            break
        response = qa_chain.invoke(query)
        print("\nAnswer:", response)

if __name__ == "__main__":
    main()