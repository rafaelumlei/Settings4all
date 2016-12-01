# Settings4all.API

This API exposes a set of endpoints that support application settings browsing and managing use cases, being currently in use in the following projects:

* [settings4net](https://github.com/rafaelumlei/settings4net): library that synchronizes settings from code to the Settings4all.API;
* [settings4all.UI](https://github.com/rafaelumlei/settings4all): backoffice that enable the browsing and managing of the applciation settings stored in the settings4all.API. 

Currently the settings repository layer supports two storage possibilities:
* Mongo Repository;
* Entity Framework Repository;

The settings repository in use must be selected and configured (**connectionString**  must be provided) in the Unity config section of the Web.config. For example, in the following example **MongoSettingsRepository** is active and the **EFSettingsRepository** is commented:

```xml
<unity xmlns="http://schemas.microsoft.com/practices/2010/unity">
    <container>
      <register type="settings4all.Repository.Interfaces.IMultiAppSettingsRepository, settings4all.Repository" mapTo="settings4all.MongoRepository.MongoSettingsRepository, settings4all.MongoRepository">
        <lifetime type="Microsoft.Practices.Unity.ContainerControlledLifetimeManager, Microsoft.Practices.Unity" />
        <constructor>
          <param name="connectionString" value="mongodb://localhost:27017/Settings4net" />
        </constructor>
      </register>
      <!--
      <register type="settings4all.Repository.Interfaces.IMultiAppSettingsRepository, settings4net.Repository" mapTo="settings4all.EFRepository.EFSettingsRepository, settings4all.EFRepository">
        <lifetime type="Microsoft.Practices.Unity.ContainerControlledLifetimeManager, Microsoft.Practices.Unity" />
        <constructor>
          <param name="connectionString" value="Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=settings4net;Integrated Security=True" />
        </constructor>
      </register>
      -->
    </container>
  </unity>```


Under construction;
