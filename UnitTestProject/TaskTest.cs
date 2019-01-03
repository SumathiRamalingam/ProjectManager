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
    public class TaskTest
    {
        TaskController objTask = new TaskController();

        [Test]
        public void B_AddTask()
        {
            Task objNew = new Task();
            objNew.TaskName = "TestTask";
            objNew.StartDate = DateTime.Now;
            objNew.EndDate = DateTime.Now.AddDays(5);
            objNew.ParentTaskName = "";
            objNew.ParentTaskId = 0;
            objNew.ParentTask = false;
            objNew.UserId = 3;
            objNew.Status = "InProgress";
            objNew.ProjectId = 1;
            objNew.ProjectName = "Project1";
            objNew.UserName = "CCCCC";
            objNew.Priority = 5;
            objTask.PostTask(objNew);            
            var response = objTask.GetTask(GetTask(objNew.TaskName).TaskId.ToString()) as OkNegotiatedContentResult<Task>;
            Assert.AreEqual(response.Content.TaskName, objNew.TaskName);
        }
       

        [Test]
        public void C_GetTasksListTest()
        {            
            List<Task> actualResult = objTask.GetTasks().ToList();
            Assert.AreEqual(actualResult.Count()>0, true);
        }

        [Test]
        public void D_GetTaskTest()
        {
            var response = objTask.GetTask(GetTask("TestTask").TaskId.ToString()) as OkNegotiatedContentResult<Task>;
            Assert.AreEqual(response.Content.TaskName, "TestTask");
        }
        [Test]
        public void E_DelelteTask()
        {
            objTask.DeleteTask(GetTask("TestTask").TaskId.ToString());
            var response = objTask.GetTask(GetTask("TestTask").TaskId.ToString()) as OkNegotiatedContentResult<Task>;
            Assert.IsNull(response);

        }

        [Test]
        public void A_UpdateTask()
        {
            Task objUpdate = new Task();
            objUpdate.TaskName = "Testing Task";
            objUpdate.StartDate = DateTime.Now;
            objUpdate.EndDate = DateTime.Now.AddDays(5);
            objUpdate.ParentTaskName = "";
            objUpdate.ParentTaskId = null;
            objUpdate.ParentTask = false;
            objUpdate.UserId = 2;
            objUpdate.Status = "InProgress";
            objUpdate.ProjectId = 3;
            objUpdate.ProjectName = "Project2";
            objUpdate.UserName = "ZZZZZ  DDDD";
            objUpdate.Priority = 5;
            objUpdate.TaskId = 5;
            objTask.PutTask("5", objUpdate);
            var response = objTask.GetTask("5") as OkNegotiatedContentResult<Task>;
            Assert.AreEqual(response.Content.TaskName, "Testing Task");
        }
        public Task GetTask(string TaskName)
        {
            List<Task> objtask = objTask.GetTasks().ToList();
            var result = objtask.Where(x => x.TaskName == TaskName);
            Task res = new Task();
            foreach (var item in result)
            {
                res = item;
            }
            return res;
        }
       
    }
}
