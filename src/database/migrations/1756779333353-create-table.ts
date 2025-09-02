import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1756779333353 implements MigrationInterface {
  name = 'CreateTable1756779333353';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."notification_channels_status_enum" AS ENUM('PENDING', 'SENT', 'FAILED', 'READ')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification_channels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "notificationId" character varying NOT NULL, "channel" character varying NOT NULL, "deliveredAt" TIMESTAMP, "readAt" TIMESTAMP, "status" "public"."notification_channels_status_enum" NOT NULL DEFAULT 'PENDING', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3bc0cb5b60e8659f5fc859b2af0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."notifications_priority_enum" AS ENUM('LOW', 'NORMAL', 'HIGH', 'CRITICAL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "email" character varying, "title" character varying NOT NULL, "message" character varying NOT NULL, "payload" jsonb, "priority" "public"."notifications_priority_enum" NOT NULL DEFAULT 'NORMAL', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."species_wateringmethod_enum" AS ENUM('root', 'spray', 'immersion', 'drip', 'wick', 'self_watering', 'overhead', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."species_fertilizingmethod_enum" AS ENUM('soil_mixing', 'surface_spread', 'liquid_feed', 'foliar_feed', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."species_fertilizertype_enum" AS ENUM('organic', 'inorganic', 'npk', 'urea', 'ammonium_sulfate', 'liquid', 'compost', 'manure', 'bonemeal', 'bloodmeal', 'green_manure', 'micro_nutrient', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."species_sunlightneed_enum" AS ENUM('full_sun', 'partial_sun', 'shade', 'unknown')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."species_difficultylevel_enum" AS ENUM('easy', 'moderate', 'hard')`,
    );
    await queryRunner.query(
      `CREATE TABLE "species" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "scientificName" character varying NOT NULL, "wateringFrequency" integer, "wateringAmount" integer, "wateringMethod" "public"."species_wateringmethod_enum", "fertilizingFrequency" integer, "fertilizingAmount" integer, "fertilizingMethod" "public"."species_fertilizingmethod_enum", "fertilizerType" "public"."species_fertilizertype_enum", "sunlightNeed" "public"."species_sunlightneed_enum", "difficultyLevel" "public"."species_difficultylevel_enum", "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "imageId" uuid, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1adf701cac3b2c0f8bacb54774" ON "species" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72005e7b5fbd98db98353f74cb" ON "species" ("scientificName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "template_site" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "sunlight" character varying, "lightDuration" character varying, "lightType" character varying, "soilMoisture" character varying, "soilType" character varying, "phSoil" character varying, "temperature" double precision, "humidity" double precision, "windExposure" character varying, "latitude" double precision, "longitude" double precision, "altitude" double precision, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e0caf3b6cfcb486ee79c48a98d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "site" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "sunlight" character varying, "lightDuration" character varying, "lightType" character varying, "soilMoisture" character varying, "soilType" character varying, "phSoil" character varying, "temperature" double precision, "humidity" double precision, "windExposure" character varying, "latitude" double precision, "longitude" double precision, "altitude" double precision, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "templateId" uuid, CONSTRAINT "PK_635c0eeabda8862d5b0237b42b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."plant_wateringmethod_enum" AS ENUM('root', 'spray', 'immersion', 'drip', 'wick', 'self_watering', 'overhead', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."plant_fertilizingmethod_enum" AS ENUM('soil_mixing', 'surface_spread', 'liquid_feed', 'foliar_feed', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."plant_fertilizertype_enum" AS ENUM('organic', 'inorganic', 'npk', 'urea', 'ammonium_sulfate', 'liquid', 'compost', 'manure', 'bonemeal', 'bloodmeal', 'green_manure', 'micro_nutrient', 'other')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."plant_sunlightneed_enum" AS ENUM('full_sun', 'partial_sun', 'shade', 'unknown')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."plant_difficultylevel_enum" AS ENUM('easy', 'moderate', 'hard')`,
    );
    await queryRunner.query(
      `CREATE TABLE "plant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "scientificName" character varying, "size" character varying, "inGround" boolean, "isDead" boolean, "wateringFrequency" integer, "wateringAmount" integer, "wateringMethod" "public"."plant_wateringmethod_enum", "fertilizingFrequency" integer, "fertilizingAmount" integer, "fertilizingMethod" "public"."plant_fertilizingmethod_enum", "fertilizerType" "public"."plant_fertilizertype_enum", "sunlightNeed" "public"."plant_sunlightneed_enum", "difficultyLevel" "public"."plant_difficultylevel_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "plantImageld" uuid, "speciesId" uuid, "userId" uuid, "siteId" uuid, CONSTRAINT "PK_97e1eb0d045aadea59401ece5ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06daeb1e9d8c4b6ac7e6bd854e" ON "plant" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7778484944052d972e129fea87" ON "plant" ("speciesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab082df81848f48f1d1f64a9cf" ON "plant" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bec0f76ffa76998edd7d297aa8" ON "plant" ("siteId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."water_method_enum" AS ENUM('root', 'spray', 'immersion', 'drip', 'wick', 'self_watering', 'overhead', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "water" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "note" text, "amount" integer NOT NULL, "method" "public"."water_method_enum" NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "plantId" uuid, CONSTRAINT "PK_8fe16d29fb45be6c0de0b2ed6a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "species" ADD CONSTRAINT "FK_cc9d8d4fd9cab08f58b95cf6471" FOREIGN KEY ("imageId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "site" ADD CONSTRAINT "FK_e03827c061fbf85fd3aae454aec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "site" ADD CONSTRAINT "FK_791bdfe69779af31d88b1996d28" FOREIGN KEY ("templateId") REFERENCES "template_site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plant" ADD CONSTRAINT "FK_7778484944052d972e129fea871" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plant" ADD CONSTRAINT "FK_ab082df81848f48f1d1f64a9cf8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "plant" ADD CONSTRAINT "FK_bec0f76ffa76998edd7d297aa8f" FOREIGN KEY ("siteId") REFERENCES "site"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" ADD CONSTRAINT "FK_16792cc5f45502f4a1e6d3409eb" FOREIGN KEY ("plantId") REFERENCES "plant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "water" DROP CONSTRAINT "FK_16792cc5f45502f4a1e6d3409eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plant" DROP CONSTRAINT "FK_bec0f76ffa76998edd7d297aa8f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plant" DROP CONSTRAINT "FK_ab082df81848f48f1d1f64a9cf8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "plant" DROP CONSTRAINT "FK_7778484944052d972e129fea871"`,
    );
    await queryRunner.query(
      `ALTER TABLE "site" DROP CONSTRAINT "FK_791bdfe69779af31d88b1996d28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "site" DROP CONSTRAINT "FK_e03827c061fbf85fd3aae454aec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "species" DROP CONSTRAINT "FK_cc9d8d4fd9cab08f58b95cf6471"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "water"`);
    await queryRunner.query(`DROP TYPE "public"."water_method_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bec0f76ffa76998edd7d297aa8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ab082df81848f48f1d1f64a9cf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7778484944052d972e129fea87"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06daeb1e9d8c4b6ac7e6bd854e"`,
    );
    await queryRunner.query(`DROP TABLE "plant"`);
    await queryRunner.query(`DROP TYPE "public"."plant_difficultylevel_enum"`);
    await queryRunner.query(`DROP TYPE "public"."plant_sunlightneed_enum"`);
    await queryRunner.query(`DROP TYPE "public"."plant_fertilizertype_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."plant_fertilizingmethod_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."plant_wateringmethod_enum"`);
    await queryRunner.query(`DROP TABLE "site"`);
    await queryRunner.query(`DROP TABLE "template_site"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_72005e7b5fbd98db98353f74cb"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1adf701cac3b2c0f8bacb54774"`,
    );
    await queryRunner.query(`DROP TABLE "species"`);
    await queryRunner.query(
      `DROP TYPE "public"."species_difficultylevel_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."species_sunlightneed_enum"`);
    await queryRunner.query(`DROP TYPE "public"."species_fertilizertype_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."species_fertilizingmethod_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."species_wateringmethod_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_priority_enum"`);
    await queryRunner.query(`DROP TABLE "notification_channels"`);
    await queryRunner.query(
      `DROP TYPE "public"."notification_channels_status_enum"`,
    );
  }
}
