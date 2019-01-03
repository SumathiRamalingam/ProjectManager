using NUnit.Framework;
using System;
using PMApiBL.Controllers;
using System.Web.Http;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using ProjectManagerApi.Controllers;
using DataModel;

namespace UnitTestProject
{
    [TestFixture]
    public class ProjectTest
    {
        ProjectController objUsr = new ProjectController();

        [Test]
        public void B_AddProject()
        {
            Project objNew = new Project();
            objNew.ProjectName = "TestProject";
            objNew.StartDate = DateTime.Now;
            objNew.EndDate = DateTime.Now.AddDays(5);
            objNew.ManagerName = "BBBB CCCC";
            objNew.UserId = 3;
            objNew.Status = "InProgress";
            objNew.TaskCount = 2;
            objNew.Priority = 5;
            objUsr.Postproject(objNew);            
            var response = objUsr.GetProject(GetProject(objNew.ProjectName).ProjectId.ToString()) as OkNegotiatedContentResult<Project>;
            Assert.AreEqual(response.Content.ProjectName, objNew.ProjectName);
        }
       

        [Test]
        public void C_GetProjectsListTest()
        {            
            List<Project> actualResult = objUsr.GetProjects().ToList();
            Assert.AreEqual(actualResult.Count()>0, true);
        }

        [Test]
        public void D_GetProjectTest()
        {
            var response = objUsr.GetProject(GetProject("TestProject").ProjectId.ToString()) as OkNegotiatedContentResult<Project>;
            Assert.AreEqual(response.Content.ProjectName, "TestProject");
        }
        [Test]
        public void E_DelelteProject()
        {
            objUsr.Deleteproject(GetProject("TestProject").ProjectId.ToString());
            var response = objUsr.GetProject(GetProject("TestProject").ProjectId.ToString()) as OkNegotiatedContentResult<Project>;
            Assert.IsNull(response);

        }

        [Test]
        public void A_UpdateProject()
        {
            Project objUpdate = new Project();
            objUpdate.ProjectName = "Project2";
            objUpdate.StartDate = DateTime.Now;
            objUpdate.EndDate = DateTime.Now.AddDays(5);            
            objUpdate.UserId = 2;
            objUpdate.Status = "Suspended";
            objUpdate.ManagerName = "ZZZZZ  DDDD";
            objUpdate.TaskCount = 2;
            objUpdate.Priority = 5;
            objUpdate.ProjectId = 3;
            objUsr.PutProject("3", objUpdate);
            var response = objUsr.GetProject("3") as OkNegotiatedContentResult<Project>;
            Assert.AreEqual(response.Content.Priority, 5);
        }
        public Project GetProject(string projectName)
        {
            List<Project> objProject = objUsr.GetProjects().ToList();
            var result = objProject.Where(x => x.ProjectName == projectName);
            Project res = new Project();
            foreach (var item in result)
            {
                res = item;
            }
            return res;
        }
       
    }
}
