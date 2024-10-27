# PrepPal: RAG assisted Disaster Prepration

write desc

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
pip install foobar
```

## Usage

Build the docker image. From the project root:

```bash
docker build -t rag-combined .
```

Run the container:

```bash
docker run -d -p 80:80 --name rag-combined-container rag-combined
```

Test the `answer` endpoint:

```bash
curl -X POST http://127.0.0.1/api/answer \
    -H "Content-Type: application/json" \
    -d '{"query": "What should I do to prepare for a hurricane?"}'
```

Expected Reponse:

```json
{
  "answer": "• Plan for your entire household including children, people with disabilities and access and functional needs, and pets.\n• Keep your gas tank at least half-full at all times.\n• Maintain basic emergency supplies (e.g., snacks, bottled water, first aid kit, flashlight, flares, jumper cables and other tools, a wool blanket, and a change of clothes) in your vehicle.\n• Pick an out-of-state contact everyone can call to check-in and report their status.",
  "documents": ["fema_effak-toolkit", "CPG_101_V2_30NOV2010_FINAL_508", "fema_2023-npr"]
}

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
