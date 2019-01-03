using NBench;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTestProject;

namespace PerfTest
{
    public class UserPerf
    {

        [PerfBenchmark(NumberOfIterations = 5, RunMode = RunMode.Throughput,
         TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 2000)]
        public void Benchmark_Update()
        {
            UserTest objUser = new UserTest();
            objUser.A_UpdateUser();
        }


        [PerfBenchmark (NumberOfIterations =5,RunMode =RunMode.Throughput,
            TestMode = TestMode.Test, SkipWarmups =true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds =2000)]
        public void Benchmark_Add()
        {
            UserTest objUser = new UserTest();
            objUser.B_AddUser();
        }       

        [PerfBenchmark(NumberOfIterations = 5, RunMode = RunMode.Throughput,
           TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 2000)]
        public void Benchmark_Get()
        {
            UserTest objUser = new UserTest();
            objUser.D_GetUserTest();
        }


        [PerfBenchmark(NumberOfIterations = 5, RunMode = RunMode.Throughput,
         TestMode = TestMode.Test, SkipWarmups = true)]
        [ElapsedTimeAssertion(MaxTimeMilliseconds = 2000)]
        public void Benchmark_GetUserList()
        {
            UserTest objUser = new UserTest();
            objUser.C_GetUsersListTest();
        }
    }
}
