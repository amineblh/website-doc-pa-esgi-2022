---
id: deploy
title: Deploy
sidebar_label: Deploy
---


## Présentation

**Classe pyhton pour la création des resossources necessaires pour le deploiement du modèle entrainé**

```express
class Deploy:
    def __init__(self,
                 bucket: str,
                 model_s3_key: str,
                 prepro_fn,
                 auth_object: UserAwsAuth,
                 template_stack_local_path,
                 deployment_lbd_local_path,
                 layer_zip_local_path,
                 workdir: str,
                 region = "us-west-1"
                 )
```


## Ressources
* La classe **Deploy** crée les ressources suivantes via une pile CloudFormation :
    * pile CloudFormation
    * Roles IAM
    * Lambda
    * API Gateway

* Offre plusieurs méthode de classe : 
    * prepare_deployment()
    * create_stack()
    * get_clf_stack_status()
    * deploy()


## Fonctions 

### easyTDV.Deploy.prepare_deployment()
#### Présenatation : 
* Une fonction qui charge les fichiers suivants vers S3:
    * **layer.zip :** un zip contenant le layer <dill>
    * **prepro_fn.pkl :** un pickle contetant la fonction de préprocessing pérsonnalisée fournie par l'utilsateur
    * **stack_template.json :** template CloudFormation pour les ressources de deploiement
    * **lbd_request_processor.py vers S3 :** code source de la lambda de deploiement
#### Returns : dict
* Retroune les keys S3 des fichiers chargés vers S3
  

    {
        "s3_lbd_key" : str,
        "url_s3_stack_template": str,
        "s3_prepro_fn_location" : str
    } 
    s3_lbd_key : chemin S3 vers le code source de lambda de deploiement.
    url_s3_stack_template : 
    s3_prepro_fn_location :

* Génère une exception en cas d'échec de chargement des fichiers vers S3


### easyTDV.Deploy.create_stack(prepare_env_response, invoke_mode=[0,1])
#### Présenatation : 
    à completer
#### Paramètres : 
* **prepare_env_response** :
    Correspond à l'objet renvoyé par la méthode de class prepare_env()

        {
            "s3_lbd_key" : str,
            "url_s3_stack_template": str,
            "s3_prepro_fn_location" : str
        } 

* **invoke_mode** :  correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone
#### Returns : dict
* mode sysnchrone:
    
    * stack_id : ID unique de la pile CloudFormation de deploiement
    * stack_name : Nom unique de la pile CloudFormation de deploiement
* mode asynchrone:
    * le statut de création de la pile CloudFormation de deploiement
* génère une exception en cas d'échec de création de la stack CloudFormation


### easyTDV.Deploy.get_clf_stack_status(stack_name)
#### Présenatation : 
    à completer
#### Paramètres : 
* **stack_name** : Nom unique de la pile CloudFormation

#### Returns : str
* Le statut de la pile CloudFormation de deploiement.
* Génère une exception en cas d'échec de création de la stack CloudFormation.

### easyTDV.Deploy.deploy(prepare_env_response, invoke_mode=[0,1])
#### Présenatation : 
    à completer
#### Paramètres : 
* **prepare_env_response** : 
    Correspond à l'objet renvoyé par la méthode de class prepare_env()

        {
            "s3_lbd_key" : str,
            "url_s3_stack_template": str,
            "s3_prepro_fn_location" : str
        } 
* **invoke_mode** : correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone

#### Returns : dict{api_name, api_endpoint}
* **api_name :** Nom unique de l'API deployée.
* **api_endpoint :** le point de terminaison de l'API déployée.


