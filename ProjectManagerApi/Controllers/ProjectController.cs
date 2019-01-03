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
    
    public class ProjectController : ApiController
    {
        private ProjectManagerEntities PMdb = new ProjectManagerEntities();


        // GET: api/projects
        [ResponseType(typeof(IEnumerable<Project>))]

        public IQueryable<Project> GetProjects()
        {            
            var projectList = PMdb.Projects;
            foreach(var item in projectList)
            {
                item.TaskCount = GetProjectTasksCount(item.ProjectId.ToString());
            }
            return projectList;
        }

        // GET: api/projects/5
        [ResponseType(typeof(Project))]

        public IHttpActionResult GetProject(string id)
        {
            Project project = PMdb.Projects.Find(Convert.ToInt32(id));
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }


        public int GetProjectTasksCount(string id)
        {            
            TaskController tc = new TaskController();
            var taskList = tc.GetTasks();
            var result = taskList.Where(x => x.ProjectId.ToString() == id).ToList();
            return result.Count();
        }

        // PUT: api/projects/5
        [ResponseType(typeof(void))]

        public IHttpActionResult PutProject(string id, [FromBody]Project project)
        {
           
            if (id.Trim() != project.ProjectId.ToString().Trim())
            {
                return BadRequest();
            }

            PMdb.Entry(project).State = EntityState.Modified;

            try
            {
                PMdb.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
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

        // POST: api/projects
        [ResponseType(typeof(Project))]

        public IHttpActionResult Postproject([FromBody]Project project)
        {
          
            PMdb.Projects.Add(project);
            PMdb.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = project.ProjectId }, project);
        }

        // DELETE: api/projects/5
        [ResponseType(typeof(Project))]

        public IHttpActionResult Deleteproject(string id)
        {
            Project project = PMdb.Projects.Find(Convert.ToInt32(id));
            if (project == null)
            {
                return NotFound();
            }

            PMdb.Projects.Remove(project);
            PMdb.SaveChanges();

            return Ok(project);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                PMdb.Dispose();
            }
            base.Dispose(disposing);
        }


        private bool ProjectExists(string id)
        {
            return PMdb.Projects.Count(e => e.ProjectId.ToString().Trim() == id.Trim()) > 0;
        }
    }
}
