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
    # Installez eayTDV version 1.2.5 spécifiquement.
    pip install easyTDV==1.2.5
    # pour une version qui n'est pas antérieur à la version 1.5.
    pip install easyTDV>=1.2.0
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

## Script d'entraînement
* Le script d'entraînement sera lancé dans l'instance réservée à l'étape de création de la pile CloudFormation.
* Le dataset utilisé pour l'entraînement sera récupéré depuis S3.
* À la fin d'entrainement, le modèle entrainé doit être chargé vers un chemin S3 que vous devriez indiquer à l'étape de déploiement.  



## Démarrage rapide
* **Exemple pour se connecter à un compte IAM** 
  ```express
    from easyTDV import UserAwsAuth as Ath

    credential_file_path = "C:/Users/IAM/new_user_credentials.csv"
    auth_object = Ath.UserAwsAuth(credential_file_path)
    auth_object.describe()
  ```
    * l'objet **auth_object** sera utilisé comme paramètre d'entré pour toutes les fonctions des classes **Train** et **Deploy**

* **Exemple d'un script d'entrainement**
  ```express 
  import boto3, dill, logging
  import pandas as pd
  import random
  from botocore.exceptions import ClientError
  from sklearn.model_selection import train_test_split
  from sklearn import linear_model


  def model_to_pickle(workdir, fun):
      file_path = f"{workdir}/modelPKL"
      dill.dump(fun, open(file_path, 'wb'))
      return file_path


  def get_file_from_s3(bucket, s3_key):
      pkl_local_path = '/tmp/dataset.csv'
      s3_client = boto3.client('s3')
      try:
          s3_client.download_file(bucket, s3_key, pkl_local_path)
      except ClientError as cle:
          logging.error(f"impossible de recuperer le dataset depuis s3: {bucket}/{s3_key}")
          logging.error(cle)
          return {
              "dataset_local_path" : None,
              "log" : cle
          }
      return {
              "dataset_local_path" : pkl_local_path,
              "log" : "recuperation dataset terminé avec succès!"
          }

  def get_dataset(bucket, s3_key):
      dataset_local_path_res = get_file_from_s3(bucket, s3_key)
      dataset_local_path = dataset_local_path_res["dataset_local_path"]
      if dataset_local_path is None:
          raise Exception("dateset not found!")
      return pd.read_csv(dataset_local_path, sep='|')



  if __name__=="__main__":
      workdir = "/appli"
      bucket = "test-final-pas-esgi"
      s3_key_model = "domaine=model/modelPKL"
      s3_key_dataset = "domaine=dataset/test-dataset.csv"

      df_salaries = get_dataset(bucket, s3_key_dataset)

      df_x = pd.DataFrame(df_salaries, columns=['age', 'sex', 'secteur_activite'])
      df_y = pd.DataFrame(df_salaries, columns=["salaire"])

      reg_model = linear_model.LinearRegression()
      x_train, x_test, y_train, y_test = train_test_split(df_x, df_y, test_size=0.2, random_state=42)

      reg_model.fit(x_train, y_train)

      model_local_path = model_to_pickle(workdir, reg_model)

      s3_client = boto3.client('s3')

      s3_client.upload_file(
          model_local_path,
          bucket,
          s3_key_model
      )
  ```

* **Exemple pour exécuter un script d'entrainement sur une EC2 et déployer le modèle résultant sur une API**
  * https://colab.research.google.com/drive/1VFzskQxVlLrh-plTdjmTtlfFfE3ni4et?usp=sharing 



## Documentation boto3
* AWS boto3 est le kit AWS SDK pour Python (Boto3) pour créer, configurer et gérer des services AWS, tels qu'Amazon Elastic Compute Cloud (Amazon EC2) et Amazon Simple Storage Service (Amazon S3). Le SDK fournit une API orientée objet ainsi qu'un accès de bas niveau aux services AWS.
* La documentation du package **boto3** détaillée est disponible sur le lien suivant : **https://boto3.amazonaws.com/v1/documentation/api/latest/index.html**

