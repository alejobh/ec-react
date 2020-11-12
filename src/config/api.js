import { create } from 'apisauce';
import { CamelcaseSerializer, SnakecaseSerializer } from 'cerealizr';
const api = create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const serializer = new CamelcaseSerializer();
const deserializer = new SnakecaseSerializer();

api.addResponseTransform(response => {
  if (response.data) {
    response.data = serializer.serialize(response.data);
  }
});

api.addRequestTransform(request => {
  if (request.data) {
    request.data = deserializer.serialize(request.data);
  }
});

export default api;
