using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace GridDemo.Models
{
    public class Dossier
    {
        public string NumeroDossier { get; set; }
        public string Siret { get; set; }
        public string NIF { get; set; }
        public string NAF { get; set; }        
        public string RaisonSociale { get; set; }
        public string Telephone { get; set; }
        public string Fax { get; set; }
        public string Adresse1 { get; set; }
        public string Adresse2 { get; set; }
        public string Adresse3 { get; set; }
        public int CodePostal { get; set; }
        public string Ville { get; set; }
        public IList<Contact> Contacts { get; set; }
        public string RegroupementSociete { set; get; }

        [ForeignKey("Associe")]
        public string CodeRessourceAssocie { get; set; }
        public Collaborateur Associe { get; set; }

        [ForeignKey("CollaborateurCompta")]
        public string CodeRessourceCollaborateurCompta { get; set; }
        public Collaborateur CollaborateurCompta { get; set; }

        [ForeignKey("CollaborateurSocial")]
        public string CodeRessourceCollaborateurSocial { get; set; }
        public Collaborateur CollaborateurSocial { get; set; }

        [ForeignKey("CollaborateurJuridique")]
        public string CodeRessourceCollaborateurJuridique { get; set; }
        public Collaborateur CollaborateurJuridique { get; set; }

        [ForeignKey("ManageurCompta")]
        public string CodeRessourceManageurCompta { get; set; }
        public Collaborateur ManageurCompta { get; set; }

        [ForeignKey("ManageurSocial")]
        public string CodeRessourceManageurSocial { get; set; }
        public Collaborateur ManageurSocial { get; set; }

        [ForeignKey("ManageurJuridique")]
        public string CodeRessourceManageurJuridique { get; set; }
        public Collaborateur ManageurJuridique { get; set; }
    }
}
