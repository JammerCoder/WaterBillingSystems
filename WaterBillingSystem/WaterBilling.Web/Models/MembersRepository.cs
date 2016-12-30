using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WaterBilling.Data.Entity;
using WaterBilling.Model;

namespace WaterBilling.Web.Models
{

    public class MemberRepository : IRepository<Member>
    {
        WaterBillingDbContext _waterBillingContext;

        public MemberRepository()
        {
            _waterBillingContext = new WaterBillingDbContext();
        }

        public IEnumerable<Member> List
        {
            get
            {
                return _waterBillingContext.Members;
            }
        }

        public void Add(Member entity)
        {
            _waterBillingContext.Members.Add(entity);
            _waterBillingContext.SaveChanges();
        }

        public void Delete(Member entity)
        {
            _waterBillingContext.Members.Remove(entity);
            _waterBillingContext.SaveChanges();
        }

        public Member FindById(int Id)
        {
            var result = (from m in _waterBillingContext.Members where m.Id == Id select m).FirstOrDefault();
            return result;
        }

        public void Update(Member entity)
        {
            _waterBillingContext.Entry(entity).State = EntityState.Modified;
            _waterBillingContext.SaveChanges();
        }
    }
}