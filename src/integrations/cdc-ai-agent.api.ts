import { ClientError } from '../lib/interfaces/error.interfaces';
import { CdcAiAgentResponse, Method, QueryOptions } from './cdc-ai-agent.interfaces';

/**
 * Generates a response by sending a query and options to the CDC AI Agent service using the native fetch API.
 *
 * @param {string} query - The query string to send.
 * @param {QueryOptions} options - The options object containing API keys, chain info, etc.
 * @returns {Promise<CdcAiAgentResponse>} - The response from the CDC AI Agent service.
 */
export const generateQuery = async (query: string, options: QueryOptions): Promise<CdcAiAgentResponse> => {
  const url = 'https://ai-agent-api.crypto.com/api/v1/cdc-ai-agent-service/query';
  const payload = { query, options };

  const response = await fetch(url, {
    method: Method.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data: CdcAiAgentResponse = await response.json();
  if (!response.ok) {
    throw new ClientError(`Generate query failed with status ${response.status}:`, data);
  }

  return data;
};
