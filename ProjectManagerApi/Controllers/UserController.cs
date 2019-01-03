using DataModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace ProjectManagerApi.Controllers
{

    public class UserController : ApiController
    {
        private ProjectManagerEntities PMdb = new ProjectManagerEntities();


        // GET: api/users
        [ResponseType(typeof(IEnumerable<User>))]

        public IQueryable<User> GetUsers()
        {
            return PMdb.Users;
        }

        // GET: api/users/5
        [ResponseType(typeof(User))]

        public IHttpActionResult GetUser(string id)
        {
            User user = PMdb.Users.Find(Convert.ToInt32(id));
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/users/5
        [ResponseType(typeof(void))]

        public IHttpActionResult PutUser(string id, [FromBody]User user)
        {            

            if (id.Trim() != user.UserId.ToString().Trim())
            {
                return BadRequest();
            }

            PMdb.Entry(user).State = EntityState.Modified;

            try
            {
                PMdb.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/users
        [ResponseType(typeof(User))]

        public IHttpActionResult PostUser([FromBody]User user)
        {           

            PMdb.Users.Add(user);
            PMdb.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = user.UserId }, user);
        }

        // DELETE: api/users/5
        [ResponseType(typeof(User))]

        public IHttpActionResult DeleteUser(string id)
        {
            User user = PMdb.Users.Find(Convert.ToInt32(id));
            if (user == null)
            {
                return NotFound();
            }

            PMdb.Users.Remove(user);
            PMdb.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                PMdb.Dispose();
            }
            base.Dispose(disposing);
        }


        private bool UserExists(string id)
        {
            return PMdb.Users.Count(e => e.UserId.ToString().Trim() == id.Trim()) > 0;
        }
    }
}
