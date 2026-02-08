import { readdirSync } from 'node:fs';

import path from 'path';

async function loadTask(dir: string, name: string) {
  let modulePath = path.join(dir, name);

  if (modulePath.startsWith('features/')) {
    modulePath = modulePath.replace('features/', '../');
  }

  try {
    const task = await import(modulePath);
    return task[name];
  } catch (error) {
    return () => {
      throw new Error(
        `Could not load task: ${name} from ${modulePath}. Is it a valid .{ts,js,tsx,jsx} file?` +
        (<Error>error).message
          ? '\n\t' + `Cause: ${(<Error>error).message}`
          : '',
      );
    };
  }
}

export async function assignTasks<T>(
  thisObj: T,
  tasksDir: string,
  subDir = '',
): Promise<void> {
  if (!tasksDir) throw new Error(`tasksDir was ${tasksDir}`);

  if (subDir && !(thisObj as Record<string, any>)[subDir]) {
    (thisObj as Record<string, any>)[subDir] = {};
  }
  const tasksScope = subDir
    ? (thisObj as Record<string, any>)[subDir]
    : thisObj;

  const files = readdirSync(tasksDir);

  for (const file of files) {
    let loadedTasks;

    const match = file.match(/(\.ts|\.js|\.tsx|\.jsx)$/);
    let name = file;

    if (match) {
      const ext = match[1];
      name = path.basename(file, ext);

      loadedTasks = await loadTask(path.join(tasksDir, subDir), name);
    } else if (!file.includes('.')) {
      loadedTasks = await assignTasks(tasksScope, path.join(tasksDir, file));
    }

    Object.defineProperty(tasksScope, name, {
      value: loadedTasks,
    });
  }

  return tasksScope;
}
