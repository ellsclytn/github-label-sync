/** Get an environment variable by name, throwing an error if it's unset */
function getEssentialEnvVar (name: string): string {
  const envVar = process.env[name]

  if (typeof envVar === 'undefined') {
    throw new Error(`${name} environment variable not set`)
  }

  return envVar
}

/** If Serverless Offline is active (i.e. local dev) */
export const isOffline = process.env.IS_OFFLINE === 'true'

export const repoSyncFunctionName = getEssentialEnvVar(
  'SYNC_REPOS_FUNCTION_NAME'
)

export const githubApiToken = getEssentialEnvVar('GITHUB_API_TOKEN')

export const githubOrg = getEssentialEnvVar('GITHUB_ORGANIZATION')

export const webhookSecret = getEssentialEnvVar('WEBHOOK_SECRET')

export const labelLocksTable = getEssentialEnvVar('LABEL_LOCKS_TABLE')
