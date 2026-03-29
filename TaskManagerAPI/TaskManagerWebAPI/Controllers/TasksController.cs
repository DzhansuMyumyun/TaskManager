using Business.Abstract;
using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TaskManagerWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        //IoC container = Inversion of Control

        ITaskItemService _taskItemService;
        public TasksController( ITaskItemService taskItemService)
        {
            _taskItemService = taskItemService;
        }

        [HttpGet]
        public List<TaskItem> Get()
        {
            var result = _taskItemService.GetAll();
            return result.Data;
        }
    }
}
