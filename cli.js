#!/usr/bin/env node

const degit = require('degit')
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const repo = 'usuario/repositorio-template' // substitua pelo seu repositório

const emitter = degit(repo, {
  cache: false,
  force: true,
  verbose: true,
})

const dest = process.argv[2] || '.'

emitter
  .clone(dest)
  .then(() => {
    console.log('Template clonado com sucesso!')

    // Opcional: Instalar dependências automaticamente
    // execSync('npm install', { stdio: 'inherit', cwd: dest });
  })
  .catch(err => {
    console.error(err)
  })
