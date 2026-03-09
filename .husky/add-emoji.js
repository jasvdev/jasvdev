#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import emojiMap from './emoji-map.js';

// Obtener el archivo de mensaje de commit desde los argumentos
const messageFile = process.argv[2];

if (!messageFile) {
  console.error('Error: No commit message file provided');
  process.exit(1);
}

try {
  // Leer el mensaje de commit
  let message = readFileSync(messageFile, 'utf-8');

  // Ignorar mensajes que empiezan con # (comentarios)
  if (message.startsWith('#')) {
    process.exit(0);
  }

  // Extraer el tipo de commit usando regex
  // Pattern: type(scope): subject o type: subject
  const conventionalCommitPattern = /^(\w+)(?:\([^\)]*\))?:\s*(.+)/;
  const match = message.match(conventionalCommitPattern);

  if (match) {
    const type = match[1];
    const remainingMessage = match[2]; // Todo después de ":"
    const emoji = emojiMap[type];

    // Si el mensaje ya tiene emoji después de ":", no hacer nada
    if (remainingMessage.trim().startsWith(':')) {
      process.exit(0);
    }

    if (emoji) {
      // Extraer la parte antes de ":" (type y scope)
      const beforeColon = message.substring(0, message.indexOf(':'));

      // Agregar el emoji después de ":" y antes del subject
      message = `${beforeColon}: ${emoji} ${remainingMessage.trim()}`;

      // Escribir el mensaje modificado de vuelta al archivo
      writeFileSync(messageFile, message, 'utf-8');
    }
  }

  process.exit(0);
} catch (error) {
  console.error('Error al procesar el mensaje de commit:', error);
  process.exit(1);
}
