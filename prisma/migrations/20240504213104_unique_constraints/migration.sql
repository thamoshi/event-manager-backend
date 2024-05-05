/*
  Warnings:

  - A unique constraint covering the columns `[eventDate,eventTime,localId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,isTicketGate,localId]` on the table `Gate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[zipCode,city,state,address,complement]` on the table `LocalInformation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Event_eventDate_eventTime_localId_key" ON "Event"("eventDate", "eventTime", "localId");

-- CreateIndex
CREATE UNIQUE INDEX "Gate_name_isTicketGate_localId_key" ON "Gate"("name", "isTicketGate", "localId");

-- CreateIndex
CREATE UNIQUE INDEX "LocalInformation_zipCode_city_state_address_complement_key" ON "LocalInformation"("zipCode", "city", "state", "address", "complement");
