using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WaterBilling.Model;

namespace WaterBilling.Data.Entity
{
    public class WaterBillingDbContext : DbContext
    {
        public WaterBillingDbContext() : base("WaterBillingDb")
        {
        }

        public DbSet<Member> Members { get; set; }
    }
}
