import React from 'react';

/**
 * desc:页脚
 * eslint(react/jsx-one-expression-per-line)
 */
export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; &nbsp;
      {new Date().getFullYear()}
      &nbsp;DevConnector
    </footer>
  );
}
