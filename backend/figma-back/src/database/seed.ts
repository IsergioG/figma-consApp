import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import { AppDataSource } from './data-source';
import { Organization } from '../entities/organization.entity';
import { Customer } from '../entities/customer.entity';

function formatCompanyName(companyId: string): string {
  return companyId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function runSeed() {
  await AppDataSource.initialize();

  try {
    const organizationRepo = AppDataSource.getRepository(Organization);
    const customerRepo = AppDataSource.getRepository(Customer);

    const file = path.resolve(process.cwd(), 'all_customers_Example.json');
    if (!fs.existsSync(file)) {
      throw new Error('all_customers_Example.json not found');
    }

    const raw = fs.readFileSync(file, 'utf8');
    const payload = JSON.parse(raw);
    const customers = Array.isArray(payload?.data) ? payload.data : [];

    if (customers.length === 0) {
      // eslint-disable-next-line no-console
      console.log('No customers to seed.');
      return;
    }

    const uniqueCompanyIds = Array.from(new Set(customers.map((c: any) => c.companyId).filter(Boolean)));
    for (const companyId of uniqueCompanyIds) {
      const exists = await organizationRepo.findOneBy({ companyId } as any);
      if (!exists) {
        await organizationRepo.save(
          organizationRepo.create({
            companyId: companyId.toString(),
            companyName: formatCompanyName(companyId.toString()),
            organizationType: 'COMPANY',
            status: 'ACTIVE',
          }),
        );
      }
    }

    const orgs = await organizationRepo.find();
    const orgById = new Map(orgs.map((o) => [o.companyId, o]));

    for (const row of customers) {
      const exists = await customerRepo.findOneBy({ customerId: row.customerId } as any);
      if (exists) continue;

      await customerRepo.save(
        customerRepo.create({
          customerId: row.customerId,
          customerCode: row.customerCode,
          companyId: row.companyId,
          organization: orgById.get(row.companyId),
          customerType: row.customerType,
          status: row.status || 'ACTIVE',
          displayName: row.displayName,
          source: row.source,
          contact: row.contact,
          addresses: row.addresses,
          personProfile: row.personProfile || null,
          businessProfile: row.businessProfile || null,
          documents: row.documents || null,
          billingProfile: row.billingProfile || null,
          classification: row.classification || row.classificationSummary || null,
          preferences: row.preferences || null,
          consents: row.consents || null,
          notes: row.notes || null,
        }),
      );
    }

    // eslint-disable-next-line no-console
    console.log(`Seed completed. Organizations: ${uniqueCompanyIds.length}, Customers processed: ${customers.length}`);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeed().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed:', err);
  process.exit(1);
});
