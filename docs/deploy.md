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
                 list_features,
                 workdir: str,
                 region = "us-west-1"
                 )
```
## Paramètres : 
* **bucket** : type : str
    * Nom du bucket S3 
* **model_s3_key** : type : str
    * Le chemin S3 vers le pickle du modèle entrainé et chargé à la fin d'entrainement 
* **prepro_fn** : type : function
    * Une fonction de preprocessing fournie par l'utilisateur, cette fonction prend en entrée un dictionnaire contenant les paramètres reçus par l'API et renvoie un objet de type attendu par l'entrée du modèle 
* **auth_object** : type : UserAwsAuth
    * Objet contenant les informations sur le User AWS à utiliser pour la création des ressources
* **list_features** : type : list
    * Liste des paramètres attendus à l'entrée du modèle
* **workdir** : type : str
    * Chemin de travail local (quelques fichiers nécessaires pour le déploiement du modèle seront créés dans ce répertoire) 
* **region** : type : str
    * Le nom de la région dans laquelle sont créées les ressources AWS, pour plus d'informations sur les régions disponibles sur AWS, veuillez consulter le lien suivant : https://aws.amazon.com/fr/about-aws/global-infrastructure/regions_az/
    * Valeur par default : us-west-1"

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
    url_s3_stack_template : url S3 vers le template CloudFormation des ressources de déploiement.
    s3_prepro_fn_location : chemin S3 vers le pickle contenant la fonction fournie par l'utilisateur 

* Génère une exception en cas d'échec de chargement des fichiers vers S3


### easyTDV.Deploy.create_stack(prepare_env_response, invoke_mode=[0,1])
#### Présenatation : 
* Une méthode de la classe Deploy permettant de créer une pile CloudFormation pour l'automatisation de la création des ressources pour la partie déploiement.
#### Paramètres : 
* **prepare_env_response** :
    Correspond à l'objet renvoyé par la méthode de class prepare_env()

        {
            "s3_lbd_key" : str,
            "url_s3_stack_template": str,
            "s3_prepro_fn_location" : str
        } 

* **invoke_mode** : type : int 
    * Correspond aux modes d'invocations de la méthode, prend les valeurs suivantes :    
        - 0: synchrone
        - 1: asynchrone
#### Returns : dict
* mode synchrone:
    * stack_id : type : str 
        * ID unique de la pile CloudFormation de deploiement
    * stack_name : type : str  
        * Nom unique de la pile CloudFormation de deploiement
* mode asynchrone: 
    * le statut de création de la pile CloudFormation de deploiement
* génère une exception en cas d'échec de création de la stack CloudFormation


### easyTDV.Deploy.get_clf_stack_status(stack_name)
#### Présenatation : 
* Une méthode de classe Deploy permettant d'obtenir le statut de création de la pile CloudFormation. 
#### Paramètres : 
* **stack_name** : Nom unique de la pile CloudFormation

#### Returns : str
* Le statut de la pile CloudFormation de deploiement.
* Génère une exception en cas d'échec de création de la stack CloudFormation.

### easyTDV.Deploy.deploy(prepare_env_response, invoke_mode=[0,1])
#### Présenatation : 
* Une méthode de la classe Deploy qui permet de lancer la pile CloudFormation de la partie déploiement. 
#### Paramètres : 
* **prepare_env_response** : 
    Correspond à l'objet renvoyé par la méthode de class prepare_env()

        {
            "s3_lbd_key" : str,
            "url_s3_stack_template": str,
            "s3_prepro_fn_location" : str
        } 
* **invoke_mode** : type : int 
    * Correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
        - 0: synchrone
        - 1: asynchrone

#### Returns : dict{api_name, api_endpoint}
* **api_name :** Nom unique de l'API deployée.
* **api_endpoint :** le point de terminaison de l'API déployée.


### easyTDV.Deploy.delete_resources():
#### Présenatation : 
* Supprime la stack CloudFormation à la fin du process. Toute les ressources créées pour cette partie seront suppriméées autimatiquement.

#### Returns : None
