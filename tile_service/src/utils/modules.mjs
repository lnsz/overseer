import fs from 'fs'
import readline from 'readline'
import yaml from 'js-yaml'
import path from 'path'
import hash from 'object-hash'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const MODULES_PATH = path.join(__dirname, '../../modules')
const DISCRIMINATORS_PATH = path.join(__dirname, '../schema/discriminators.mjs')
const TEMPLATES_PATH = path.join(__dirname, '../schema/templates')
const IMPORT_TEMPLATE_PATH = path.join(TEMPLATES_PATH, 'import')
const IMPORT_TEMPLATE = fs.readFileSync(IMPORT_TEMPLATE_PATH)
const DISCRIMINATOR_TEMPLATE_PATH = path.join(TEMPLATES_PATH, 'discriminator')
const DISCRIMINATOR_TEMPLATE = fs.readFileSync(DISCRIMINATOR_TEMPLATE_PATH)

export const getModuleFiles = async () => await fs.promises.readdir(MODULES_PATH)
export const getModule = (moduleFile) => {
  return yaml.safeLoad(
    fs.readFileSync(
      path.join(MODULES_PATH, moduleFile)
    )
  )
}

export const parseModules = async () => {
  const moduleFiles = await getModuleFiles()
  return moduleFiles.map(moduleFile => {
    return getModule(moduleFile)
  })
}

const getMD5 = (modules) => `// MD5: ${hash(modules)}`

const getFirstLine = async (file) => {
  const fileStream = readline.createInterface({
    input: fs.createReadStream(file)
  })
  
  const firstLine = await new Promise(resolve => {
    fileStream.on('line', (line) => {
      fileStream.close()
      resolve(line)
    })
  })
  return firstLine 
}

const shouldWriteFile = async (modules) => {
  if (!fs.existsSync(DISCRIMINATORS_PATH)) return true

  const firstLine = await getFirstLine(DISCRIMINATORS_PATH)
  return firstLine !== getMD5(modules)
}

const discriminatorText = (modules) => {
  return [getMD5(modules), IMPORT_TEMPLATE].join('\r\n')
}

const initModules = async (modules) => {
  if (await shouldWriteFile(modules)) {
    console.log(fs.existsSync(DISCRIMINATORS_PATH))
    if (fs.existsSync(DISCRIMINATORS_PATH)) fs.unlinkSync(DISCRIMINATORS_PATH)
    fs.writeFileSync(DISCRIMINATORS_PATH, discriminatorText(modules))
  } 
}

export const loadModules = async () => {
  const modules = await parseModules()
  initModules(modules)
  return 1
}