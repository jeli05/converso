from deep_translator import GoogleTranslator
from os import path

filename = "prompts.txt"
prompts = []

with open(filename) as file:
    for line in file:
        prompt = line.rstrip()
        prompts.append(prompt)
        # print(prompt)

# print(prompts)

prompt_test = prompts[:10]
print(prompt_test)

basepath = "src/prompts/"
fr_name = "fr_prompts.txt"
fr_path = basepath + fr_name
fr_path = path.relpath(fr_path)

fr_translations = []
with open(fr_path, 'w', encoding='utf-8') as f:
    for entry in prompt_test:
        translation_fr = GoogleTranslator(source='en', target='fr').translate(entry)
        fr_translations.append(translation_fr)
        print(translation_fr, file=f)

print(fr_translations)