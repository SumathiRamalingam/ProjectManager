using DataModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace ProjectManagerApi.Controllers
{
    
    public class TaskController : ApiController
    {
        private ProjectManagerEntities PMdb = new ProjectManagerEntities();


        // GET: api/tasks
        [ResponseType(typeof(IEnumerable<Task>))]

        public IQueryable<Task> GetTasks()
        {
            return PMdb.Tasks;
        }

        // GET: api/tasks/5
        [ResponseType(typeof(Task))]

        public IHttpActionResult GetTask(string id)
        {
            Task task = PMdb.Tasks.Find(Convert.ToInt32(id));
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

   

        // PUT: api/tasks/5
        [ResponseType(typeof(void))]

        public IHttpActionResult PutTask(string id, [FromBody]Task task)
        {
           

            if (id.Trim() != task.TaskId.ToString().Trim())
            {
                return BadRequest();
            }

            PMdb.Entry(task).State = EntityState.Modified;

            try
            {
                PMdb.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
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

        // POST: api/tasks
        [ResponseType(typeof(Task))]

        public IHttpActionResult PostTask([FromBody]Task task)
        {
           

            PMdb.Tasks.Add(task);
            PMdb.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = task.TaskId }, task);
        }

        // DELETE: api/tasks/5
        [ResponseType(typeof(Task))]

        public IHttpActionResult DeleteTask(string id)
        {
            Task task = PMdb.Tasks.Find(Convert.ToInt32(id));
            if (task == null)
            {
                return NotFound();
            }

            PMdb.Tasks.Remove(task);
            PMdb.SaveChanges();

            return Ok(task);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                PMdb.Dispose();
            }
            base.Dispose(disposing);
        }


        private bool TaskExists(string id)
        {
            return PMdb.Tasks.Count(e => e.TaskId.ToString().Trim() == id.Trim()) > 0;
        }
    }
}
