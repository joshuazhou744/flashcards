import xml.etree.ElementTree as ET

def parse_xml(file_path, start_id):
    tree = ET.parse(file_path)
    root = tree.getroot()

    flashcards = []
    card_id = start_id

    for card in root.findall('.//card'):
        front = None
        back = None

        for text_element in card.findall(".//text"):
            name_attr = text_element.attrib.get('name')
            if name_attr:
                if 'Text' in name_attr:
                    front = text_element.text
                elif 'Translation' in name_attr:
                    back = text_element.text
        if front is not None and back is not None:
            flashcard = {
                "id": card_id,
                "front": front,
                "back": back,
                "score": 0
            }

            flashcards.append(flashcard)
            card_id += 1

    return flashcards

if __name__ == "__main__":
    file_path = './assets/korean translations.xml'
    flashcards = parse_xml(file_path, 0)
    print(flashcards)