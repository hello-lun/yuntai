let modules = [];

function requireAll (context) {
  context.keys().forEach((path) => {
    if (path === './index.js') return;
    const key = path.match(/\/(\S+)\.js$/)[1];
    let moduleRoutes = context(path).default;

    moduleRoutes.forEach((route) => {
      let { meta } = route;
      route.meta = Object.assign(
        {},
        meta,
        { moduleName: key }
      );
    });

    modules = modules.concat(context(path).default);
  });
}

requireAll(require.context('./', true, /\.js$/));

export default modules;
