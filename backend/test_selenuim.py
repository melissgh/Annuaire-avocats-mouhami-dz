# from selenium.webdriver.common.keys import Keys
# import unittest
# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys  # Ajout de l'import Keys
# from selenium.webdriver.chrome.service import Service
# import time  # Ajout de l'import time

# class TestSearchLawyersView(unittest.TestCase):

#     @classmethod
#     def setUpClass(cls):
#         # Spécifier le chemin complet du fichier exécutable ChromeDriver
#         path_to_chromedriver = r'C:\Users\ELITEBOOK\Documents\webdriver\chromedriver-win64\chromedriver.exe'
        
#         # Utiliser le Service pour spécifier le chemin du ChromeDriver
#         chrome_service = Service(path_to_chromedriver)
#         cls.driver = webdriver.Chrome(service=chrome_service)
#         cls.driver.get("http://127.0.0.1:8000/api/search-lawyers/")  # Remplacez par l'URL de votre application

#     def test_search_lawyers(self):
#         # Remplacer les valeurs suivantes par celles que nous souhaitons tester
#         adresse = "Bejaia"
#         specialite = "Droits"
#         langues = "Espagnol"

#         # Ajout d'un délai d'attente après le chargement de la page
#         time.sleep(10)

#         # Trouver les champs de recherche et les remplir
#         adresse_input = self.driver.find_element('input[name="adresse"]')
#         adresse_input.send_keys(adresse)

#         specialite_input = self.driver.find_element('input[name="specialite"]')
#         specialite_input.send_keys(specialite)

#         langues_input = self.driver.find_element('input[name="langues"]')
#         langues_input.send_keys(langues)

#         # Soumettre le formulaire de recherche
#         langues_input.send_keys(Keys.RETURN)

#         # Vérifier si le message "Aucun avocat trouvé avec ces critères de recherche." est présent
#         error_message = self.driver.find_element_by_id('error-message')
#         self.assertIn("Aucun avocat trouvé avec ces critères de recherche.", error_message.text)

#     @classmethod
#     def tearDownClass(cls):
#         # Fermer le navigateur après tous les tests
#         cls.driver.quit()

# if __name__ == "__main__":
#     unittest.main()
###################################################################################################
# from selenium import webdriver
# import time

# # Démarrer le WebDriver Selenium
# driver = webdriver.Chrome()

# # Ouvrir la page
# driver.get("http://localhost:3000/profil/1")

# try:
#     # Attendre un court instant pour que la page se charge complètement
#     time.sleep(2)

#     # Cliquer sur le bouton "Prendre rendez-vous"
#     bouton_rendezvous = driver.find_element_by_xpath("//button[contains(text(), 'Prendre rendez-vous')]")
#     bouton_rendezvous.click()

#     # Vous pouvez ajouter d'autres étapes d'interaction ou d'assertion ici

# finally:
#     # Assurer la fermeture du WebDriver, même en cas d'exception
#     time.sleep(2)  # Ajouter un délai pour voir visuellement les changements avant de fermer le navigateur
#     driver.quit()
#####################################################################################################""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Démarrer le WebDriver Selenium
driver = webdriver.Chrome()

# Ouvrir la page d'inscription de l'avocat
driver.get("http://localhost:3000/AvocateSign")

try:
    # Attendre que la page se charge complètement
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "firstName")))

    # Remplir le formulaire d'inscription avec une saisie plus lente
    input_element = driver.find_element(By.NAME, "firstName")
    text_to_type = "Melissa"

    for char in text_to_type:
        input_element.send_keys(char)
        time.sleep(0.2)
    time.sleep(2)
    
    input_element = driver.find_element(By.NAME, "secondName")
    text_to_type = "Ghemari"

    for char in text_to_type:
        input_element.send_keys(char)
        time.sleep(0.2)

    time.sleep(2)
   
    input_element = driver.find_element(By.NAME, "phoneNumber")
    text_to_type = "0556789099"

    for char in text_to_type:
        input_element.send_keys(char)
        time.sleep(0.2)
    time.sleep(2)
    
    input_element = driver.find_element(By.NAME, "email")
    text_to_type = "melissa@gmail.com"

    for char in text_to_type:
        input_element.send_keys(char)
        time.sleep(0.2)
    time.sleep(2)
   
    input_element = driver.find_element(By.NAME, "password")
    text_to_type = "melissa12345678"

    for char in text_to_type:
        input_element.send_keys(char)
        time.sleep(0.2)
    time.sleep(2)

    # Cliquer sur le bouton "Sign Up"
    driver.find_element(By.CSS_SELECTOR, ".submit").click()

    # Attendre un court instant pour voir le résultat
    time.sleep(2)


finally:
    # Assurer la fermeture du WebDriver, même en cas d'exception
    time.sleep(5)  # Ajouter un délai avant de fermer le navigateur
    driver.quit()
