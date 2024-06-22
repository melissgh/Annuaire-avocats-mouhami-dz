import requests
from bs4 import BeautifulSoup
import re
# r= requests.get("https://avocatalgerien.com/listings/category/code-administratif/page/1/")
# print(r.status_code)

def get_all_pages():
    urls=[]
    page_number = 1

    for i in range(56):
         i=f"https://www.barreaudenice.com/annuaire/avocats/?fwp_paged={page_number}/"
         page_number+=1
         urls.append(i)
    # print(urls)
    return urls

def parse_attorney(url):
    r= requests.get(url)
    soup=BeautifulSoup(r.content,"html.parser")
    avocats= soup.find_all('div', class_='callout secondary annuaire-single')

    for avocat in avocats:

        try:
            nom = avocat.find('h3').text.strip()
        except AttributeError as e:
            nom=""
        # print(nom)
        adresse= avocat.find('span',class_='adresse').text.strip()
        try:
            adresse_finale= re.sub(r"\s+"," ",adresse)
        except AttributeError as e:
            adresse_finale=""
        # print(adresse_finale)
        try:
            telephone = avocat.find('span',class_='telephone').text.strip()
        except AttributeError as e:
            telephone=""
        # print(telephone)
        try:
            email = avocat.find('span',class_='email').a.text.strip()
        except AttributeError as e:
            email=""
        # print(email)
        chemin = r"C:\Users\ELITEBOOK\Documents\GitHub\GLP\annuaireAvocat.txt"
        with open(chemin, "a") as f :
            f.write(f"{nom}\n")
            f.write(f"{adresse_finale}\n")
            f.write(f"{telephone}\n")
            f.write(f"{email}\n\n")


def parse_all_attorneys():
    pages= get_all_pages()
    for page in pages:
        parse_attorney(url=page)
        print(f"On scrape {page}")

parse_all_attorneys()