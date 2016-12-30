namespace WaterBilling.Data.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<WaterBilling.Data.Entity.WaterBillingDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(WaterBilling.Data.Entity.WaterBillingDbContext context)
        {
        }
    }
}
