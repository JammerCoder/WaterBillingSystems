using System;
using System.Collections.Generic;
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
    [RoutePrefix("/api/Members")]
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
    }
}
