import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotifications1755922656817 implements MigrationInterface {
  name = 'CreateNotifications1755922656817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TYPE "public"."notifications_priority_enum" AS ENUM('LOW', 'NORMAL', 'HIGH', 'CRITICAL')
        `);

    await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" character varying NOT NULL,
                "email" character varying,
                "title" character varying NOT NULL,
                "message" character varying NOT NULL,
                "payload" jsonb,
                "priority" "public"."notifications_priority_enum" NOT NULL DEFAULT 'NORMAL',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TYPE "public"."notification_channels_status_enum" AS ENUM('PENDING', 'SENT', 'FAILED', 'READ')
        `);

    await queryRunner.query(`
            CREATE TABLE "notification_channels" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "notificationId" uuid NOT NULL,
                "channel" character varying NOT NULL,
                "deliveredAt" TIMESTAMP WITH TIME ZONE,
                "readAt" TIMESTAMP WITH TIME ZONE,
                "status" "public"."notification_channels_status_enum" NOT NULL DEFAULT 'PENDING',
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_3bc0cb5b60e8659f5fc859b2af0" PRIMARY KEY ("id"),
                CONSTRAINT "FK_notification_channels_notification" FOREIGN KEY ("notificationId") REFERENCES "notifications"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notification_channels"`);
    await queryRunner.query(
      `DROP TYPE "public"."notification_channels_status_enum"`,
    );
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TYPE "public"."notifications_priority_enum"`);
  }
}
