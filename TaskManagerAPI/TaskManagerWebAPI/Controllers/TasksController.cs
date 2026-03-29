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

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var result = _taskItemService.GetAll();
            if (result.Success) 
            { 
                return Ok(result.Data);
            }
            return BadRequest(result.Message);
        }

        [HttpGet("getbyid/{id}")]
        public IActionResult GetById(int id)
        {
            var result = _taskItemService.GetById(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }


        [HttpPost("add")]
        public IActionResult Add(TaskItem taskItem)
        {
            var result = _taskItemService.Add(taskItem);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        [HttpPost("update")]
        public IActionResult Update(TaskItem taskItem)
        {
            var result = _taskItemService.Update(taskItem);
            if (result.Success)
            {
                return Ok(result.Message);
            }
            return BadRequest(result.Message);
        }


        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var result = _taskItemService.Delete(id);
            if (result.Success)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

    }

}
