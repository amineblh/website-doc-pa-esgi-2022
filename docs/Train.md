---
id: train
title: Train
sidebar_label: Train
---

## Présentation

**Classe python pour la création des ressources AWS via une pile CloudFormation**

```express
class Train:
    def __init__(self,
                     bucket,
                     auth_object,
                     train_script_local_path,
                     requirements_local_path,
                     instance_type,
                     device_size,
                     ami = "ami-0d9858aa3c6322f73",
                     region = "us-west-1"
                     )

```

## Paramètres : 
* **bucket** : type : str
    * Nom du bucket S3 
* **auth_object** : type : UserAwsAuth
    * Objet contenant les informations sur le User AWS à utiliser pour la création des ressources
* **train_script_local_path** : type : str 
    * Chemin local vers le script d'entrainement
* **requirements_local_path** : type : str
    * Chemin local vers le fichier contenant les librairies nécessaires pour l'entrainement du modèle
* **instance_type** : type : str
    * Le type de l'instance EC2 à utiliser. Les types d'instances ainsi que leurs caractéristiques sont répertoriées sur le lien suivant : https://aws.amazon.com/fr/ec2/instance-types/
* **device_size** : type : str
    * La taille du volume EBS à rattacher à l'instance d'entrainement, pour plus dinformations sur les tailles des volumes EBS disponibles veuillez consulter le lien suivant : https://docs.aws.amazon.com/fr_fr/AWSEC2/latest/UserGuide/ebs-volume-types.html
* **ami** : type : str
    * Le nom de l'AMI (Image OS) à utiliser, pour plus d'informations sur les images AMIs disponibles, veuillez consulter le lien suivant : https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html 
    * Valeur par default : "ami-0d9858aa3c6322f73"
* **region** : type : str
    * Le nom de la région dans laquelle sont créées les ressources AWS, pour plus d'informations sur les régions disponibles sur AWS, veuillez consulter le lien suivant : https://aws.amazon.com/fr/about-aws/global-infrastructure/regions_az/
    * Valeur par default : us-west-1"

## Ressources
* La classe **Train** crée les ressources suivantes sur le compte aws de l'utilisateur :
    * pile CloudFormation
    * roles IAM
    * InstanceProfil
    * Lambda
    * EC2

* offre plusieurs methodes de classe :
    * prepare_env()
    * create_clf_stack()
    * get_clf_stack_status()
    * lunch_train_ec2()
    * install_requerments()
    * lunch_train_script()
    * delete_ressources()

## Fonctions 

### easyTDV.Train.prepare_env()
#### Présentation : 
* Une fonction qui charge les fichiers suivants vers S3:
    * train.py : script d'entrainement
    * requirements.txt : fichier contanant les librairies necessaires pour l'execution de <train.py>
    * stack_template.json : template CloudFormation pour les ressources d'entrainement
    * lbd_train.py : code source de la lambda d'entrainement
#### Returns :
* Retroune les keys S3 des fichiers chargés vers S3 :
```express 
    {
        "s3_lbd_key": str,
        "s3_train_script_key": str,
        "s3_requirements_key": str,
        "url_s3_stack_template": str
    }
```      
    s3_lbd_key : chemin S3 vers le code source de lambda de deploiement.
    s3_train_script_key : chemin S3 vers le code d'entrainement du modèle.
    s3_requirements_key : chemin S3 vers les librairies nécessaires pour l'execution du script d'entrainement.  
    url_s3_stack_template : url S3 vers le template de la pile CloudFormation d'entainement. 
      
* génère une exception en cas d'échec de chargement des fichiers vers s3

### easyTDV.Train.create_clf_stack(prepare_env_response, invoke_mode=[0,1])
#### Presenatation :
* Une méthode de la classe Train permettant de créer une pile CloudFormation pour l'automatisation de la création des ressources pour la partie Train.
#### Paramètres : 
* **prepare_env_response** :
    Correspond à l'objet renvoyé par la méthode de class prepare_env()
   
        {
            "s3_lbd_key": str,
            "s3_train_script_key": str,
            "s3_requirements_key": str,
            "url_s3_stack_template": str
        }
* **invoke_mode** : type : int 
    * Correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone

#### Returns : dict{stack_id, stack_status}
* **stack_id** : L'id de la stack créée pour les appels synchrones
* **stack_status** : Le statut de la création de la stack pour les appels asynchrones

* Génère une exception en cas d'échec de création de la stack CloudFormation


### easyTDV.Train.get_clf_stack_status(stack_name):
#### Présenatation : 
* Une méthode de classe Train permettant d'obtenir le statut de création de la pile CloudFormation. 
#### Paramètres : 
* **stack_name** : type : str
    * Le nom de la stack CloudFormation

#### Returns : type : str 
* **stack_name** Le statut en cours de la stack **<stack_name>**
* Génère une exception en cas d'échec à l'appel <boto3.client.describe_stacks()>


### easyTDV.Train.lunch_train_ec2(invoke_mode=[0,1]):
#### Présenatation : 
* Une méthode de la classe Train permettant de lancer l'instance d'entraienement. Cette instance est lancée via une Lambda déployée à l'étape de préparation de l'environnement. 
#### Paramètres : 
* **invoke_mode** : type : int 
    * Correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone

#### Returns : str 
* L'id unique de l'instance d'entrainement si le lancement de l'ec2 est OK
* Execute la lambda de création d'instance d'entrainement et configure la VM
* Génère une exception en cas où la création de l'instance est KO


### easyTDV.Train.install_requerments(instance_id, invoke_mode=[0,1]):
#### Présenatation : 
* Une méthode de la classe Train permettant d'installer les librairies nécessaires pour l'exécution du script d'entrainement du modèle.
#### Paramètres : 
* **instance_id** : type : str 
    * L'id unique de la commande SSM lancée sur l'instance d'entrainement

* **invoke_mode** : type : int 
    * Correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone

#### Returns : str
* L'id unique de l'instance d'entrainement si le lancement de l'ec2 est OK
* Installe les librairies necessaires pour l'entrainement du modèle 
* Génère une exception en cas où la commande SSM est KO



### easyTDV.Train.lunch_train_script(instance_id, invoke_mode=[0,1]):
#### Présenatation : 
* Une méthode de la classe Train permettant d'execute le script d'entrainement dans la machine d'id : <instance_id>.
#### Paramètres : 
* **instance_id** : type : str 
    * L'id unique de l'instance d'entrainement
* **invoke_mode** : type : int 
    * Correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone

#### Returns : str
* Le status d'execution du script d'entrainement
* Génère une exception en cas où l'entrainement est KO

### easyTDV.Train.delete_resources(instance_id):
#### Présenatation : 
* Supprime la stack CloudFormation et resilier l'instance d'entrainement à la fin du process.
#### Paramètres : 
* **instance_id** : type : str 
    * L'id unique de l'instance d'entrainement

#### Returns : None
