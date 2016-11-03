BREW ?= brew
DB := ohhi
MAKE ?= make
NPM ?= npm
OSTYPE := $(shell uname)
PSQL ?= psql
USER := postgres
PASSWORD := postgres

ifeq ($(OSTYPE), Darwin)
install:
	$(MAKE) clean
	$(MAKE) install-modules
	$(MAKE) install-osx
	$(MAKE) setup-db
else 
install: 
	$(MAKE) install-linux
	$(MAKE) setup-db
endif

clean:

	@echo "Removing node_modules"
	rm -rf node_modules/

install-linux:
	@echo "Installing Linux"

install-osx:

	@echo "Updating brew"
	$(BREW) update

	@echo "Uninstalling postgres"
	$(BREW) uninstall --force postgres

	@echo "Reinstalling postgres"
	$(BREW) install postgres

	@echo "Starting postrgres"
	$(BREW) services start postgres

install-modules:

	@echo "Install node modules"
	$(NPM) install

setup-db:

	@echo "Initializing $(DB) database"
	@if $(PSQL) -lqt | cut -d \| -f 1 | grep -qw $(DB) ; then \
		echo "Database already exists" ; \
	else \
		createdb $(DB) ; \
	fi

	@echo "Creating user"
	@if $(PSQL) $(DB) -tAc "SELECT 1 FROM pg_roles WHERE rolname='$(USER)'" | grep -q 1 ; then \
		echo "User already exists" ; \
	else \
		$(PSQL) $(DB) -c "CREATE USER $(USER) WITH PASSWORD '$(PASSWORD)';" ; \
	fi

	@echo "Adding Tables"
	$(PSQL) $(DB) -f src/modules/user/schema.sql

	@echo "Granting privileges"
	$(PSQL) $(DB) -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $(USER);"
	$(PSQL) $(DB) -c "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO $(USER);"

start:

	@echo "Starting Server"
	$(NPM) start

