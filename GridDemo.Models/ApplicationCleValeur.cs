using System.Collections.Generic;
using System;

namespace GridDemo.Models
{
    public class ApplicationCleValeur
    {
        public int Id { get; set; }
        public Application Application { get; set; }
        public string Cle { get; set; }
        public string Valeur { get; set; }
        public Dossier Dossier { get; set; }
    }
}
