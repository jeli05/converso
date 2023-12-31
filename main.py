from deep_translator import GoogleTranslator
from os import path
import random
from datetime import date, datetime

# filename = "prompts.txt"
filename = "hoots_prompts_archive_filtered.txt"
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
        prompts_length = len(prompts)
        counter = 0
        for entry in prompts:
            translation = GoogleTranslator(source='en', target=lang).translate(entry)
            translations.append(translation)
            print(translation, file=f)
            counter += 1
            if counter % 10 == 0:
                print("Translated ", counter, " of ", prompts_length)

    print(translations)

random_prompt_list = []
def determine_exercise_order(num):
    for i in range(0, num):
        n = random.randint(0, num-1)
        random_prompt_list.append(n)
    print(random_prompt_list)

def provide_exercise(lang, today, entry):
    prompt_path = 'src/prompts/' + lang + '_prompts.txt'
    f = open(prompt_path, encoding='utf-8')
    lines = f.readlines()
    print(today)
    print(lines[entry])
    with open('client/src/today.txt', 'a', encoding='utf-8') as today_file:
        today_file.write(lines[entry])

def write_prompts_dict(lang):
    prompt_path = 'src/prompts/' + lang + '_prompts.txt'
    with open(prompt_path, 'r', encoding='utf-8') as f:
        lines = {i: line for i, line in enumerate(f, 1)}
    return lines

def check_date():
    today = date.today()
    day_of_year = datetime.now().timetuple().tm_yday  # returns 1 for January 1st
    return today, day_of_year

user_responses = []
def store_input(entry):
    user_response = input("Your response: ")
    user_responses.append({entry: user_response})
    print("Running grammar check...")
    print(user_responses)
    
if __name__=="__main__":
    generate_prompts("de")
    # determine_exercise_order(232)
    # today, entry = check_date()
    # provide_exercise("it", today, entry)
    print(write_prompts_dict("de"))
    # store_input(entry)