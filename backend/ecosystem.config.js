module.exports = {
  apps: [
    {
      name: 'secureshare-api',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: ['src'],
      ignore_watch: ['node_modules', 'logs', 'uploads'],
      max_memory_restart: '1G',
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
