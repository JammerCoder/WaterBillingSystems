using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WaterBilling.Data.Entity;
using WaterBilling.Model;

namespace WaterBilling.Web.Controllers.api
{
    //Route
    [RoutePrefix("api/Members")]
    public class MembersController : ApiController
    {
        WaterBillingDbContext _db;

        public MembersController()
        {
            _db = new WaterBillingDbContext();
        }

        [ResponseType(typeof(Member))]
        [HttpPost]
        public HttpResponseMessage SaveMember(Member amember)
        {
            int result = 0;
            try
            {
                _db.Members.Add(amember);
                _db.SaveChanges();
                result = 1;
            }
            catch (Exception e)
            {

                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        [ResponseType(typeof(Member))]
        [HttpGet]
        public List<Member> GetMembers()
        {
            List<Member> members = null;
            try
            {
                members = _db.Members.ToList();
            }
            catch (Exception e)
            {
                members = null;
            }

            return members;
        }

        [Route("GetMemberById/{Id:int}")]
        [ResponseType(typeof(Member))]
        [HttpGet]
        public Member GetMemberById(int Id)
        {
            Member amember = null;
            try
            {
                amember = _db.Members.Where(x => x.Id == Id).SingleOrDefault();
            }
            catch (Exception e)
            {
                amember = null;
            }

            return amember;
        }

        [ResponseType(typeof(Member))]
        [HttpPut]
        public HttpResponseMessage UpdateMember( Member amember)
        {
            int result = 0;

            try
            {
                _db.Members.Attach(amember);
                _db.Entry(amember).State = EntityState.Modified;
                _db.SaveChanges();
                result = 1;
            }
            catch(Exception e)
            {
                result = 0;
            }

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

    }
}
