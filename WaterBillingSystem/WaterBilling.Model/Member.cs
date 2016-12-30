using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WaterBilling.Model
{
    
    public partial class Member : IEntity
    {
        public new int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

    }
}
