using System.Collections.Generic;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GridDemo.Models
{
    public class Contact
    {
        public string Login { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Email { get; set; }
        public bool IsActif { get; set; }


        [ForeignKey("DossierPrincipal")]
        public string NumeroDossierPrincipal { get; set; }
        public Dossier DossierPrincipal { get; set; }

        public IList<Dossier> Dossiers { get; set; }
        public Collaborateur CollaborateurContact { get; set; }
        public DateTime? DerniereConnexion { get; set; }
        public DateTime? DateCreation { get; set; }
    }
}
