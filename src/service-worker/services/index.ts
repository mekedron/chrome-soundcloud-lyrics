import ServiceRoutes from '../../constants/service-routes';
import LyricsService from './lyrics';
import services = chrome.privacy.services;

interface ServiceMessage {}

interface ServiceResponse {
  error: boolean;
  message?: string;
}

interface Service<
  ServiceMessageType extends ServiceMessage,
  ServiceResponseType extends ServiceResponse,
> {
  execute(
    sender: chrome.runtime.MessageSender,
    message: ServiceMessageType
  ): Promise<ServiceResponseType>;
}

type ServiceListenerMessage<T> = T & {
  route: ServiceRoutes;
};

type RegisteredServices = {
  [route in ServiceRoutes]: Service<any, any>;
};

export type {
  ServiceMessage,
  ServiceResponse,
  Service,
  ServiceListenerMessage,
};

const registeredServices: RegisteredServices = {
  [ServiceRoutes.Lyrics]: new LyricsService(),
};

chrome.runtime.onMessage.addListener(function (
  message: ServiceListenerMessage<ServiceMessage>,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: ServiceResponse) => void
) {
  if (!registeredServices[message.route]) {
    sendResponse({ error: true, message: 'Invalid service route' });
    return;
  }

  (async () => {
    try {
      const serviceResponse = await registeredServices[message.route].execute(
        sender,
        message
      );

      sendResponse(serviceResponse);
    } catch (e) {
      console.error(e);
      sendResponse({
        error: true,
        message: 'Unexpected error :(',
      });
    }
  })();

  return true;
});
