#!/usr/bin/env node

const degit = require('degit')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk') // Importando o chalk

const repo = 'JohnC0de/tsstart'

const emitter = degit(repo, {
  cache: false,
  force: true,
  verbose: true,
})

const dest = process.argv[2] || '.'

emitter
  .clone(dest)
  .then(() => {
    console.log(chalk.green.bold('\n --- ✅ Project cloned successfully! --- '))

    console.log(chalk.blue.bold('\n --- 📦 Installing dependencies... --- '))
    execSync('bun i', { stdio: 'inherit', cwd: dest })

    console.log(chalk.blue.bold('\n --- 🔧 Setting up environment variables... --- '))
    const envExamplePath = path.join(dest, '.env.example')
    const envPath = path.join(dest, '.env')
    try {
      fs.copyFileSync(envExamplePath, envPath)
      console.log(chalk.green('\n --- .env file created successfully. --- '))
    } catch (err) {
      console.error(chalk.red('\n --- Error copying .env file:', err))
    }

    // Configurar o banco de dados
    console.log(chalk.blue.bold('\n --- 🗄️  Creating DB tables... --- '))
    execSync('bun push', { stdio: 'inherit', cwd: dest })

    console.log(chalk.green.bold('\n --- 🎉 All done! --- '))
    console.log(chalk.yellow("\n --- ⚠️  Don't forget to set up the environment variables for OAuth. --- \n"))
  })
  .catch(err => {
    console.error(chalk.red('\n --- Error cloning project:', err))
  })
