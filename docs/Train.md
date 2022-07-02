---
id: train
title: Train
sidebar_label: Train
---

## Présentation

**Classe pyhton pour la création des ressources AWS via une pile CloudFormation**

```express
class Train:
    def __init__(self,
                     bucket,
                     auth_object,
                     template_stack_local_path,
                     train_script_local_path,
                     requirements_local_path,
                     train_lbd_local_path,
                     instance_type,
                     device_size,
                     ami = "ami-0d9858aa3c6322f73",
                     region = "us-west-1"
                     )

```

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
#### Présenatation : 
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
    a completer
#### Paramètres : 
* **prepare_env_response** :
    Correspond à l'objet renvoyé par la méthode de class prepare_env()
   
        {
            "s3_lbd_key": str,
            "s3_train_script_key": str,
            "s3_requirements_key": str,
            "url_s3_stack_template": str
        }
* **invoke_mode** :  correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone

#### Returns : dict{stack_id, stack_status}
* **stack_id** : L'id de la stack créée pour les appels synchrones
* **stack_status** : Le statut de la création de la stack pour les appels asynchrones

* Génère une exception en cas d'échec de création de la stack CloudFormation


### easyTDV.Train.get_clf_stack_status(stack_name):
#### Présenatation : 
    a completer
#### Paramètres : 
* **stack_name** :
    Le nom de la stack CloudFormation

#### Returns : str : stack_name
* Le statut en cours de la stack **<stack_name>**
* Génère une exception en cas d'échec à l'appel <boto3.client.describe_stacks()>


### easyTDV.Train.lunch_train_ec2(invoke_mode=[0,1]):
#### Présenatation : 
    a completer
#### Paramètres : 
* **invoke_mode** : correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone

#### Returns : str 
* L'id unique de l'instance d'entrainement si le lancement de l'ec2 est OK
* Execute la lambda de création d'instance d'entrainement et configure la VM
* Génère une exception en cas où la création de l'instance est KO


### easyTDV.Train.install_requerments(instance_id, invoke_mode=[0,1]):
#### Présenatation : 
    a completer
#### Paramètres : 
* **instance_id** : l'id unique de la commande SSM lancée sur l'instance d'entrainement

* **invoke_mode** : correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
        - 0: synchrone
        - 1: asynchrone

#### Returns : str
* L'id unique de l'instance d'entrainement si le lancement de l'ec2 est OK
* Installe les librairies necessaires pour l'entrainement du modèle 
* Génère une exception en cas où la commande SSM est KO



### easyTDV.Train.lunch_train_script(instance_id, invoke_mode=[0,1]):
#### Présenatation : 
    Execute le script d'entrainement dans la machine d'id : <instance_id>
#### Paramètres : 
* **instance_id** : l'id unique de l'instance d'entrainement
* **invoke_mode** : correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    

        - 0: synchrone
        - 1: asynchrone

#### Returns : str
* Le status d'execution du script d'entrainement
* Génère une exception en cas où l'entrainement est KO

### easyTDV.Train.delete_resources(instance_id):
#### Présenatation : 
* Supprime la stack CloudFormation et resilier l'instance d'entrainement à la fin du process.
#### Paramètres : 
* **instance_id** : l'id unique de l'instance d'entrainement

#### Returns : None
