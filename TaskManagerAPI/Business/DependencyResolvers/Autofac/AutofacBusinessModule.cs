using Autofac;
using Autofac.Extras.DynamicProxy;
using Business.Abstract;
using Business.Concrete;
using Castle.DynamicProxy;
using Core.Utilities.Interceptors;
using Core.Utilities.Security.JWT;
using DataAccess.Abstract;
using DataAccess.Concrete.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.DependencyResolvers.Autofac
{
    public class AutofacBusinessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<TaskItemManager>().As<ITaskItemService>().SingleInstance();
            builder.RegisterType<EfTaskItemDal>().As<ITaskDal>().SingleInstance();

            builder.RegisterType<ProjectManager>().As<IProjectService>().SingleInstance();
            builder.RegisterType<EfProjectDal>().As<IProjectDal>().SingleInstance();
            
            builder.RegisterType<AttachmentManager>().As<IAttachmentService>().SingleInstance();
            builder.RegisterType<EfAttachmentDal>().As<IAttachmentDal>().SingleInstance();

            builder.RegisterType<SubTaskManager>().As<ISubTaskService>().SingleInstance();
            builder.RegisterType<EfSubTaskDal>().As<ISubTaskDal>().SingleInstance();

            builder.RegisterType<TaskActivityManager>().As<ITaskActivityService>().SingleInstance();
            builder.RegisterType<EfTaskActivityDal>().As<ITaskActivityDal>().SingleInstance();

            builder.RegisterType<ProjectActivityManager>().As<IProjectActivityService>().SingleInstance();
            builder.RegisterType<EfProjectActivityDal>().As<IProjectActivityDal>().SingleInstance();

            builder.RegisterType<UserManager>().As<IUserService>();
            builder.RegisterType<EfUserDal>().As<IUserDal>();

            builder.RegisterType<AuthManager>().As<IAuthService>();
            builder.RegisterType<JwtHelper>().As<ITokenHelper>();



            var assembly = System.Reflection.Assembly.GetExecutingAssembly();

            builder.RegisterAssemblyTypes(assembly).AsImplementedInterfaces()
                .EnableInterfaceInterceptors(new ProxyGenerationOptions()
                {
                    Selector = new AspectInterceptorSelector()
                }).SingleInstance();

        }
    }
}
