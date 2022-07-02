---
id: start
title: Get Started
sidebar_label: Get Started
---


**Pour une première utilisation de easyTDV veuillez vous documenter et suivre les étapes suivantes**

## Installation à partir d'un terminal: 
* Pour charger la dernière version
    ```express
    pip install easyTDV 
    ```
* Pour installer une version spécifique
    ```express
    # Installez eayTDV version 1.2.0 spécifiquement.
    pip install easyTDV==1.2.0 
    # pour une version qui n'est pas antérieur à la version 1.5.
    pip install easyTDV>=1.5.0
    # pour une version qui n'est pas plus récente à la version 1.5.  
    pip install easyTDV<=1.5.0
    ```
## Utilisation des identifiants de compte AWS
* Pour pouvoir exécuter un code permettant d'effectuer une certaine tâche, il vous faut d'abord être en possession des identifants (aws_access_key_id, aws_secret_access_key) d'un compte user AWS possédant les autorisations administrateurs.
* Dans le cas contraire vous devez créer un nouveau compte IAM sur votre console AWS à partir de votre compte AWS racine.
  * **https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html**
* à la fin de la création de votre compte IAM, vous devez télécharger le fichier nommé **"new_user_credentials"** au format .csv.
  * Ce fichier sera appelé à l'exécution de chaque script que vous aller développer et il permeteras de fournir vos identifiants et établir la connexion à votre compte.        

## Créaction d'un bucket S3 sur AWS
* Pour pouvoir sauvgarder le modèle IA, faut créer un bucket S3 sur AWS, avec les parametres suivants :
  * **région** : USA Ouest (Californie du Nord) us-west-1.
  * Le reste des régions seront ajoutées prochainement.
  * Le nom du bucket sera utilisé à l'exécution.

## Démarrage rapide
* **Exemple pour se connecter à un compte IAM** 
  ```express
    from easyTDV import UserAwsAuth as Ath

    credential_file_path = "C:/Users/IAM/new_user_credentials.csv"
    auth_object = Ath.UserAwsAuth(credential_file_path)
    auth_object.describe()
  ```
    * l'objet **auth_object** sera utilisé comme paramètre d'entré pour toutes les fonctions des classes **Train** et **Deploy**
  
* **Exemple pour exécuter un script d'entrainement sur une EC2 et déployer le modèle résultant sur une API**
  ```express 
  from easyTDV import UserAwsAuth as Ath
  from easyTDV import Train as T
  from easyTDV import Deploy as D
  from easyTDV import Vizualisation as V

  def prepro_fn(input_model):
      import numpy as np
      age = float(input_model["age"])
      sex = float(input_model["sex"])
      return np.array([age, sex]).reshape(-1, 2)

  if __name__ == "__main__":
      bucket = "test-pa-esgi-02072022"
      device_size = "2"
      instance_type = "t2.medium"
      model_s3_key = "domaine=model/modelPKL"

      local_rep = "."
      train_script_local_path = f"{local_rep}/trainscript.py"
      requirements_local_path = f"{local_rep}/requirements.txt"

      credential_file_path = r"C:\Users\IAM\new_user_credentials.csv"
      auth_object = Ath.UserAwsAuth(credential_file_path)
      auth_object.describe()

       # Partie entrainement

      print("===============================>[Train]<===============================")
      train_object = T.Train(bucket, auth_object, train_script_local_path,
                          requirements_local_path, instance_type, device_size)

      prep_env_response = train_object.prepare_env()

      create_stack_status = train_object.create_clf_stack(prep_env_response)

      instance_id = train_object.lunch_train_ec2()

      install_req_status = train_object.install_requerments(instance_id)

      if install_req_status["status"]=="Success":
          train_status = train_object.lunch_train_script(instance_id)
          if train_status["status"] == "Success":
              print("\n========>train finished!")

      train_object.delete_resources(instance_id)

      # Partie Deploiement

      print("===============================>[Deployment]<===============================")

      workdir = "."

      DeployObject = D.Deploy(bucket, model_s3_key, prepro_fn, auth_object,workdir)

      print("[Deployment] prepare_env...")
      deployment_prepare_env = DeployObject.prepare_deployment()

      print("[Deployment] deploy...")
      api_response = DeployObject.deploy(deployment_prepare_env)

      print(api_response)

      api_name = api_response["api_name"]

      print("===============================>[Visualization]<===============================")
      VizObject = V.Vizualisation(bucket, auth_object, api_name)

      vizualisation_prepare_env = VizObject.prepare_env()

      dashboard_name = VizObject.vizualise(vizualisation_prepare_env)

      print(dashboard_name)




    ```


## Documentation boto3
* AWS boto3 est le kit AWS SDK pour Python (Boto3) pour créer, configurer et gérer des services AWS, tels qu'Amazon Elastic Compute Cloud (Amazon EC2) et Amazon Simple Storage Service (Amazon S3). Le SDK fournit une API orientée objet ainsi qu'un accès de bas niveau aux services AWS.
* La documentation du package **boto3** détaillée est disponible sur le lien suivant : **https://boto3.amazonaws.com/v1/documentation/api/latest/index.html**

## Documentation easyTDV

[WORK IN PROGRESS]