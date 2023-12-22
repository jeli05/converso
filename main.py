from deep_translator import GoogleTranslator
from os import path

filename = "prompts.txt"
prompts = []

with open(filename) as file:
    for line in file:
        prompt = line.rstrip()
        prompts.append(prompt)

def generate_prompts(lang):
    basepath = "src/prompts/"
    output_name = lang + "_prompts.txt"
    output_path = basepath + output_name
    output_path = path.relpath(output_path)

    translations = []
    with open(output_path, 'w', encoding='utf-8') as f:
        f.truncate(0)
        for entry in prompts:
            translation = GoogleTranslator(source='en', target=lang).translate(entry)
            translations.append(translation)
            print(translation, file=f)

    print(translations)

generate_prompts("es")