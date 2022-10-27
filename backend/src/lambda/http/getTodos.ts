import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils';
import { getAllTodos } from '../../businessLogic/todos';


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    const todos = await getAllTodos(getUserId(event))

    return {
      statusCode: 200,
      body: JSON.stringify({ items: todos })
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
